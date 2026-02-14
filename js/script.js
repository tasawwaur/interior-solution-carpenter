document.addEventListener("DOMContentLoaded", function() {
    
    /* ===============================
       GALLERY SYSTEM (AUTO NUMBER)
    =============================== */
    
    let currentPage = 1;
    const imagesPerPage = 48;
    const totalImages = 1000;   // 👈 yaha total images count
    let allImages = [];
    
    function generateImages() {
        for (let i = 1; i <= totalImages; i++) {
            let number = String(i).padStart(3, "0");
            allImages.push(`gallery-${number}.jpg`);
        }
        displayImages();
    }
    
    function displayImages() {
        
        const container = document.getElementById("galleryContainer");
        const pageNumber = document.getElementById("pageNumber");
        
        if (!container) return;
        
        container.innerHTML = "";
        
        const totalPages = Math.ceil(allImages.length / imagesPerPage);
        const start = (currentPage - 1) * imagesPerPage;
        const end = start + imagesPerPage;
        const pageImages = allImages.slice(start, end);
        
        pageImages.forEach(image => {
            
            const div = document.createElement("div");
            div.classList.add("gallery-item", "fade-in");
            
            div.innerHTML = `
                <img src="images/gallery/${image}" 
                     class="gallery-img" 
                     loading="lazy"
                     alt="Interior Image">
            `;
            
            container.appendChild(div);
        });
        
        if (pageNumber) {
            pageNumber.innerText = `Page ${currentPage} / ${totalPages}`;
        }
        
        enableLightbox();
        enableFadeAnimation();
    }
    
    window.nextPage = function() {
        const totalPages = Math.ceil(allImages.length / imagesPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayImages();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };
    
    window.prevPage = function() {
        if (currentPage > 1) {
            currentPage--;
            displayImages();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };
    
    if (document.getElementById("galleryContainer")) {
        generateImages();
    }
    
    /* ===============================
       LIGHTBOX
    =============================== */
    
    function enableLightbox() {
        
        const images = document.querySelectorAll(".gallery-img, .service-lightbox");
        const lightbox = document.getElementById("lightbox");
        const lightboxImg = document.getElementById("lightbox-img");
        const closeBtn = document.getElementById("close");
        
        if (!lightbox || !lightboxImg || !closeBtn) return;
        
        images.forEach(img => {
            img.onclick = function() {
                lightbox.style.display = "flex";
                lightboxImg.src = this.src;
            };
        });
        
        closeBtn.onclick = function() {
            lightbox.style.display = "none";
        };
        
        lightbox.onclick = function(e) {
            if (e.target !== lightboxImg) {
                lightbox.style.display = "none";
            }
        };
        
        document.onkeydown = function(e) {
            if (e.key === "Escape") {
                lightbox.style.display = "none";
            }
        };
    }
    
    enableLightbox();
    
    /* ===============================
       FADE ANIMATION
    =============================== */
    
    function enableFadeAnimation() {
        const faders = document.querySelectorAll(".fade-in");
        
        if ("IntersectionObserver" in window) {
            
            const observer = new IntersectionObserver(function(entries, observer) {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                });
            }, { threshold: 0.2 });
            
            faders.forEach(fader => observer.observe(fader));
        }
    }
    
    enableFadeAnimation();
    
    /* ===============================
       ACTIVE NAV AUTO
    =============================== */
    
    const navLinks = document.querySelectorAll("nav a");
    
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add("active");
        }
    });
    
    /* ===============================
       WHATSAPP PULSE
    =============================== */
    
    const whatsappBtn = document.querySelector(".whatsapp-btn");
    
    if (whatsappBtn) {
        setInterval(() => {
            whatsappBtn.classList.toggle("pulse");
        }, 1500);
    }
    
});