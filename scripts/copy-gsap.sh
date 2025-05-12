#!/bin/bash
# Script to copy GSAP files from node_modules to the static directory

# Create the destination directory if it doesn't exist
mkdir -p /workspaces/greenova/greenova/static/js/vendors/gsap

# Copy the necessary GSAP files
cp /workspaces/greenova/node_modules/gsap/dist/gsap.min.js /workspaces/greenova/greenova/static/js/vendors/gsap/
cp /workspaces/greenova/node_modules/gsap/dist/ScrollTrigger.min.js /workspaces/greenova/greenova/static/js/vendors/gsap/
cp /workspaces/greenova/node_modules/gsap/dist/ScrollSmoother.min.js /workspaces/greenova/greenova/static/js/vendors/gsap/
cp /workspaces/greenova/node_modules/gsap/dist/Flip.min.js /workspaces/greenova/greenova/static/js/vendors/gsap/

echo "✅ GSAP files have been copied to the static directory"
