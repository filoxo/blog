---
title: spline time
date: 2025-05-20
tags: [javascript, gen-ai]
---

been playing with gen ai tools, such as Claude and Windsurf. i've had a decent amount of success with this model and i finally came up with something i would like to make with it - a spline scene that you can interact with.

<!-- excerpt-end -->

the prompt was very simple and i was really happy with the output. [here is the result from Claude](https://claude.ai/share/99ab0ce9-bf31-4f3b-baac-0b11578ee362), which i then copied into this post, adapted a little bit, and then used Windsurf locally to update some of the issues. vibe coded while watching Murderbot with friends 🙀

<div id="scene"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

<script>
  // Setup scene, camera, and renderer
  const container = document.getElementById("scene");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientWidth, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  console.log(container.clientWidth)

  renderer.setSize(container.clientWidth, container.clientWidth);
  renderer.setClearColor(0x87CEEB); // Sky blue background
  container.appendChild(renderer.domElement);

  // Ambient light
  const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
  scene.add(ambientLight);

  // Directional light (like sunlight)
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
  directionalLight.position.set(5, 10, 7.5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // Create ground (green plane)
  const groundGeometry = new THREE.PlaneGeometry(50, 50);
  const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x3CB371, side: THREE.DoubleSide });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = Math.PI * -0.5;
  ground.position.y = -2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Colors for the temple
  const stoneColor = 0xB5A642; // Brass/sandstone color
  const stepColor = 0x8B7355;  // Darker for steps/accents
  const templeColor = 0xCDC0B0; // Lighter for main structures

  // Create Aztec Temple
  function createAztecTemple() {
      const temple = new THREE.Group();
      
      // Base layers (pyramidal structure)
      const baseLayerCount = 5;
      let currentWidth = 16;
      let currentHeight = 0.8;
      
      for (let i = 0; i < baseLayerCount; i++) {
          // Create base layer
          const baseGeometry = new THREE.BoxGeometry(currentWidth, currentHeight, currentWidth);
          const baseMaterial = new THREE.MeshStandardMaterial({ color: stoneColor });
          const baseLayer = new THREE.Mesh(baseGeometry, baseMaterial);
          baseLayer.position.y = i * currentHeight;
          baseLayer.castShadow = true;
          baseLayer.receiveShadow = true;
          temple.add(baseLayer);
          
          // Create stairs for each side
          if (i < baseLayerCount - 1) {
              const nextWidth = currentWidth - 2;
              const stairWidth = currentWidth * 0.2;
              const stairDepth = (currentWidth - nextWidth) / 2;
              const stairGeometry = new THREE.BoxGeometry(stairWidth, currentHeight, stairDepth);
              const stairMaterial = new THREE.MeshStandardMaterial({ color: stepColor });
              
              // Front stairs
              const frontStairs = new THREE.Mesh(stairGeometry, stairMaterial);
              frontStairs.position.set(0, i * currentHeight + currentHeight / 2, currentWidth / 2 - stairDepth / 2);
              frontStairs.castShadow = true;
              frontStairs.receiveShadow = true;
              temple.add(frontStairs);
              
              // Back stairs
              const backStairs = new THREE.Mesh(stairGeometry, stairMaterial);
              backStairs.position.set(0, i * currentHeight + currentHeight / 2, -currentWidth / 2 + stairDepth / 2);
              backStairs.castShadow = true;
              backStairs.receiveShadow = true;
              temple.add(backStairs);
              
              // Left stairs
              const leftStairsGeometry = new THREE.BoxGeometry(stairDepth, currentHeight, stairWidth);
              const leftStairs = new THREE.Mesh(leftStairsGeometry, stairMaterial);
              leftStairs.position.set(-currentWidth / 2 + stairDepth / 2, i * currentHeight + currentHeight / 2, 0);
              leftStairs.castShadow = true;
              leftStairs.receiveShadow = true;
              temple.add(leftStairs);
              
              // Right stairs
              const rightStairs = new THREE.Mesh(leftStairsGeometry, stairMaterial);
              rightStairs.position.set(currentWidth / 2 - stairDepth / 2, i * currentHeight + currentHeight / 2, 0);
              rightStairs.castShadow = true;
              rightStairs.receiveShadow = true;
              temple.add(rightStairs);
          }
          
          currentWidth -= 2;
      }
      
      // Temple top (small building)
      const templeTopGeometry = new THREE.BoxGeometry(currentWidth * 0.8, 2, currentWidth * 0.8);
      const templeTopMaterial = new THREE.MeshStandardMaterial({ color: templeColor });
      const templeTop = new THREE.Mesh(templeTopGeometry, templeTopMaterial);
      templeTop.position.y = baseLayerCount * currentHeight + 1;
      templeTop.castShadow = true;
      templeTop.receiveShadow = true;
      temple.add(templeTop);
      
      // Temple door
      const doorGeometry = new THREE.BoxGeometry(1.2, 1.5, 0.5);
      const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
      const door = new THREE.Mesh(doorGeometry, doorMaterial);
      door.position.set(0, baseLayerCount * currentHeight + 0.75, currentWidth * 0.4 + 0.25);
      temple.add(door);
      
      // Decorative elements - pillars
      const pillarGeometry = new THREE.CylinderGeometry(0.3, 0.3, 2, 8);
      const pillarMaterial = new THREE.MeshStandardMaterial({ color: stepColor });
      
      // Left pillar
      const leftPillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
      leftPillar.position.set(-currentWidth * 0.3, baseLayerCount * currentHeight + 1, currentWidth * 0.4);
      leftPillar.castShadow = true;
      temple.add(leftPillar);
      
      // Right pillar
      const rightPillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
      rightPillar.position.set(currentWidth * 0.3, baseLayerCount * currentHeight + 1, currentWidth * 0.4);
      rightPillar.castShadow = true;
      temple.add(rightPillar);
      
      // Top decoration
      const topDecorGeometry = new THREE.BoxGeometry(currentWidth * 0.6, 0.8, currentWidth * 0.4);
      const topDecorMaterial = new THREE.MeshStandardMaterial({ color: 0x8B0000 });
      const topDecor = new THREE.Mesh(topDecorGeometry, topDecorMaterial);
      topDecor.position.y = baseLayerCount * currentHeight + 2.5;
      topDecor.castShadow = true;
      temple.add(topDecor);
      
      return temple;
  }

  // Create and add the temple to the scene
  const temple = createAztecTemple();
  scene.add(temple);

  // Position camera
  camera.position.set(0, 10, 20);
  camera.lookAt(0, 5, 0);

  // Original camera position for reset
  const originalPosition = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z
  };
  
  const originalLookAt = new THREE.Vector3(0, 5, 0);

  // Orbit control variables
  let isDragging = false;
  let previousMousePosition = {
      x: 0,
      y: 0
  };
  let orbitRadius = Math.sqrt(
      camera.position.x * camera.position.x + 
      camera.position.z * camera.position.z
  );
  let angleHorizontal = Math.atan2(camera.position.z, camera.position.x);
  let angleVertical = Math.atan2(
      Math.sqrt(camera.position.x * camera.position.x + camera.position.z * camera.position.z),
      camera.position.y - 5
  );
  
  // Variables to store starting angles when drag begins
  let startAngleHorizontal = angleHorizontal;
  let startAngleVertical = angleVertical;

  // Interaction event listeners - attach only to the container
  container.addEventListener('mousedown', onMouseDown);
  container.addEventListener('mouseup', onMouseUp);
  container.addEventListener('mousemove', onMouseMove);
  container.addEventListener('touchstart', onTouchStart, { passive: false });
  container.addEventListener('touchend', onTouchEnd);
  container.addEventListener('touchmove', onTouchMove, { passive: false });
  window.addEventListener('resize', onWindowResize);

  function onMouseDown(event) {
      isDragging = true;
      // Get coordinates relative to the container
      previousMousePosition = {
          x: event.offsetX,
          y: event.offsetY
      };
      
      // Store the starting angles when drag begins
      startAngleHorizontal = angleHorizontal;
      startAngleVertical = angleVertical;
  }

  function onMouseUp() {
      isDragging = false;
      resetCamera();
  }

  function onTouchStart(event) {
      event.preventDefault();
      isDragging = true;
      const rect = container.getBoundingClientRect();
      previousMousePosition = {
          x: event.touches[0].clientX - rect.left,
          y: event.touches[0].clientY - rect.top
      };
      
      // Store the starting angles when touch begins
      startAngleHorizontal = angleHorizontal;
      startAngleVertical = angleVertical;
  }

  function onTouchEnd() {
      isDragging = false;
      resetCamera();
  }

  function resetCamera() {
      // Animate camera back to original position
      const duration = 1000; // Reset duration in ms
      const startTime = Date.now();
      
      const startPosition = {
          x: camera.position.x,
          y: camera.position.y,
          z: camera.position.z
      };
      
      const startLookAt = new THREE.Vector3();
      camera.getWorldDirection(startLookAt);
      startLookAt.multiplyScalar(100).add(camera.position);
      
      function animateReset() {
          const elapsedTime = Date.now() - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          
          // Ease in-out function
          const easing = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
          
          camera.position.x = startPosition.x + (originalPosition.x - startPosition.x) * easing;
          camera.position.y = startPosition.y + (originalPosition.y - startPosition.y) * easing;
          camera.position.z = startPosition.z + (originalPosition.z - startPosition.z) * easing;
          
          camera.lookAt(0, 5, 0);
          
          if (progress < 1) {
              requestAnimationFrame(animateReset);
          }
      }
      
      animateReset();
  }

  function onMouseMove(event) {
      if (!isDragging) return;
      
      const deltaMove = {
          x: event.offsetX - previousMousePosition.x,
          y: event.offsetY - previousMousePosition.y
      };
      
      handleCameraMovement(deltaMove);
      
      previousMousePosition = {
          x: event.offsetX,
          y: event.offsetY
      };
  }

  function onTouchMove(event) {
      event.preventDefault();
      if (!isDragging) return;

      const rect = container.getBoundingClientRect();
      const touchX = event.touches[0].clientX - rect.left;
      const touchY = event.touches[0].clientY - rect.top;
      
      const deltaMove = {
          x: touchX - previousMousePosition.x,
          y: touchY - previousMousePosition.y
      };
      
      handleCameraMovement(deltaMove);
      
      previousMousePosition = {
          x: touchX,
          y: touchY
      };
  }

  function handleCameraMovement(deltaMove) {
      // Adjust rotation speeds (reduced for more control)
      const rotationSpeed = 0.003;
      
      // Define angle limits (15 degrees = π/12 radians)
      const maxAngle = Math.PI / 12; // 15 degrees limit in any direction
      
      // Update angles based on mouse movement with reduced sensitivity
      angleHorizontal -= deltaMove.x * rotationSpeed;
      angleVertical += deltaMove.y * rotationSpeed;
      
      // Apply limits relative to where the drag started
      // Limit horizontal movement to ±15 degrees from where drag started
      angleHorizontal = Math.max(startAngleHorizontal - maxAngle, 
                              Math.min(startAngleHorizontal + maxAngle, angleHorizontal));
      
      // Limit vertical movement to ±15 degrees from where drag started
      // Also add absolute limits to prevent extreme angles
      const absoluteMinVertical = Math.PI / 4;      // 45 degrees (prevent looking too far up)
      const absoluteMaxVertical = 3 * Math.PI / 4;  // 135 degrees (prevent looking too far down)
      
      angleVertical = Math.max(
          Math.max(startAngleVertical - maxAngle, absoluteMinVertical),
          Math.min(Math.min(startAngleVertical + maxAngle, absoluteMaxVertical), angleVertical)
      );
      
      // Fixed orbit radius - prevent zooming in/out
      const fixedOrbitRadius = 20;
      
      // Calculate new camera position with constraints
      camera.position.x = fixedOrbitRadius * Math.cos(angleHorizontal) * Math.sin(angleVertical);
      camera.position.z = fixedOrbitRadius * Math.sin(angleHorizontal) * Math.sin(angleVertical);
      camera.position.y = fixedOrbitRadius * Math.cos(angleVertical) + 5; // +5 to focus on temple center
      
      // Always look at the temple center
      camera.lookAt(0, 5, 0);
  }

  function onWindowResize() {
      camera.aspect = container.clientWidth / container.clientWidth;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientWidth);
  }

  // Animation loop
  function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
  }

  animate();
</script>
