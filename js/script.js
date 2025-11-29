// Các hàm tiện ích
function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

// === 1. Thư viện ảnh đơn giản (Gallery Section) ===
function setupGallery() {
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');

    // Hàm đặt trạng thái Active
    const setActiveThumbnail = (thumb) => {
        thumbnails.forEach(t => {
            // Xóa các trạng thái active cũ
            t.classList.remove('active-thumbnail');
            t.classList.remove('border-primary'); 
            t.classList.add('border-transparent');
        });
        // Đặt trạng thái active mới
        thumb.classList.add('active-thumbnail');
        thumb.classList.add('border-primary'); // Giữ border-primary cho viền
    };

    // Thiết lập ảnh lớn ban đầu từ thumbnail đầu tiên
    if (thumbnails.length > 0) {
        const initialUrl = thumbnails[0].getAttribute('data-image-url');
        mainImage.src = initialUrl;
        // Highlight thumbnail đầu tiên
        setActiveThumbnail(thumbnails[0]);
    }

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const imageUrl = thumbnail.getAttribute('data-image-url');
            
            // 1. Cập nhật ảnh lớn
            mainImage.src = imageUrl;

            // 2. Cập nhật trạng thái active
            setActiveThumbnail(thumbnail);
        });
    });
}

// === 2. Scroll Effect (Header) ===
function setupScrollEffect() {
    const header = document.getElementById('header');
    const scrollThreshold = 50; // Khoảng cách cuộn để thêm class

    const handleScroll = () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // Gắn sự kiện cuộn (sử dụng debounce để tối ưu hiệu năng)
    window.addEventListener('scroll', debounce(handleScroll, 20));
    // Chạy lần đầu để kiểm tra vị trí nếu trang được làm mới ở vị trí cuộn
    handleScroll(); 
}

// === 3. Tư duy sáng tạo: Intersection Observer cho Features ===
function setupFeaturesAnimation() {
    const featureItems = document.querySelectorAll('.feature-item');

    // Cấu hình Intersection Observer
    const observerOptions = {
        root: null, // Dùng viewport làm root
        rootMargin: '0px',
        threshold: 0.2 // Kích hoạt khi 20% phần tử xuất hiện
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Thêm class để kích hoạt hiệu ứng CSS
                entry.target.classList.add('in-view');
                // Ngừng quan sát sau khi đã hiển thị
                observer.unobserve(entry.target); 
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Bắt đầu quan sát từng phần tử
    featureItems.forEach(item => {
        observer.observe(item);
    });
}

// === Xử lý menu Hamburger cho Responsive ===
function setupMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// === Khởi tạo tất cả ===
window.addEventListener('DOMContentLoaded', () => {
    setupGallery();
    setupScrollEffect();
    setupFeaturesAnimation();
    setupMobileMenu();
});