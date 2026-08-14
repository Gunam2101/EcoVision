-- EcoVision AI Relational Database Schema (PostgreSQL)
-- Generated for EcoVision AI Platform

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum Types
CREATE TYPE user_role AS ENUM ('ADMIN', 'RESEARCHER', 'USER');
CREATE TYPE detection_source AS ENUM ('WEBCAM', 'IMAGE_UPLOAD', 'BATCH_PROCESS');
CREATE TYPE waste_category AS ENUM ('PLASTIC', 'GLASS', 'METAL', 'PAPER', 'CARDBOARD', 'ORGANIC', 'E_WASTE', 'HAZARDOUS', 'TRASH');

-- 1. Roles Table
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name user_role UNIQUE NOT NULL DEFAULT 'USER',
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
    recycling_score INT DEFAULT 0,
    total_scans INT DEFAULT 0,
    total_co2_saved_kg DOUBLE PRECISION DEFAULT 0.0,
    is_verified BOOLEAN DEFAULT FALSE,
    otp_code VARCHAR(10),
    otp_expires_at TIMESTAMP WITH TIME ZONE,
    reset_password_token VARCHAR(255),
    reset_password_expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role_id ON users(role_id);

-- 3. Sessions Table (Refresh Tokens)
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    refresh_token_hash VARCHAR(255) NOT NULL,
    user_agent TEXT,
    ip_address VARCHAR(45),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);

-- 4. DetectionHistory Table
CREATE TABLE detection_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    source detection_source NOT NULL DEFAULT 'WEBCAM',
    image_url TEXT,
    total_objects INT DEFAULT 0,
    recyclable_count INT DEFAULT 0,
    eco_score INT DEFAULT 0,
    total_co2_saved_kg DOUBLE PRECISION DEFAULT 0.0,
    processing_time_ms DOUBLE PRECISION DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_detection_history_user_id ON detection_history(user_id);
CREATE INDEX idx_detection_history_created_at ON detection_history(created_at DESC);

-- 5. DetectedObjects Table
CREATE TABLE detected_objects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    detection_id UUID NOT NULL REFERENCES detection_history(id) ON DELETE CASCADE,
    label waste_category NOT NULL,
    confidence DOUBLE PRECISION NOT NULL,
    box_x DOUBLE PRECISION NOT NULL,
    box_y DOUBLE PRECISION NOT NULL,
    box_width DOUBLE PRECISION NOT NULL,
    box_height DOUBLE PRECISION NOT NULL,
    recyclable BOOLEAN NOT NULL DEFAULT TRUE,
    co2_savings_kg DOUBLE PRECISION DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_detected_objects_detection_id ON detected_objects(detection_id);
CREATE INDEX idx_detected_objects_label ON detected_objects(label);

-- 6. Images Table
CREATE TABLE images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    detection_id UUID REFERENCES detection_history(id) ON DELETE SET NULL,
    storage_url TEXT NOT NULL,
    public_id VARCHAR(255),
    file_size_bytes INT,
    mime_type VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Analytics Table
CREATE TABLE analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    total_detections INT DEFAULT 0,
    plastic_count INT DEFAULT 0,
    glass_count INT DEFAULT 0,
    metal_count INT DEFAULT 0,
    paper_count INT DEFAULT 0,
    organic_count INT DEFAULT 0,
    trash_count INT DEFAULT 0,
    total_co2_saved_kg DOUBLE PRECISION DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, date)
);

-- 8. Reports Table
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    report_type VARCHAR(50) NOT NULL,
    file_url TEXT,
    status VARCHAR(50) DEFAULT 'COMPLETED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Notifications Table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'INFO',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Feedback Table
CREATE TABLE feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. ActivityLogs Table
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Settings Table
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(255) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
