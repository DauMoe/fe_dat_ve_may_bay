# Các thay đổi:
- [ ] tách quản lý chuyến bay riêng: tab này chỉ hiển thị các chuyến bay theo dạng bảng, tạo chuyến bay, lọc theo địa điểm hoặc ngày tháng
- [ ] phần qly vé thêm nút xác nhận đã thanh toán bên cạnh nút hủy vé, hiển thị thêm tên người đặt vé. 
- [x] phần qly vé ban đầu sẽ show all vé và nếu người dùng chọn chuyến nào thì hiển thị chuyến đó
- [x] copy các hình thức đặt vé cũng như thanh toán sang bên tìm kiếm vé
- [x] để hình ảnh khi search vé xong có chiều cao bằng nhau, cắt trên dưới ảnh đi

# Dev TODO
(BE) TODO: 
- khi ord vé -> state PENDING thay vì AVAILABLE. Thêm một api nhỏ khi bấm vào đó thì chuyển PENDING -> AVAILABLE và gửi mail. Nếu đang ở PENDING nhấn nút hủy thì quay về AVAILABLE
- check lại api book vé
- chuyến bay cho tìm kiếm theo địa điểm hoặc ngày tháng
-------------------------------------------------------------------------------------------------------------------------------------------------------
(FE) TODO:
- tách giao diện qly chuyến bay
- hiển thị toàn bộ vé của các chuyến bay -> khi user select chuyến bay thì mới lọc ra vé của riêng chuyến bay đó
mẻ