#!/usr/bin/env bash
set -e

echo "========================================================"
echo "  EcoVision AI Workspace Bootstrap & Environment Setup  "
echo "========================================================"

mkdir -p frontend backend ai-service database docker docs shared scripts

echo "Installing root workspace dependencies..."
npm install

echo "Workspace structure initialization completed successfully!"
