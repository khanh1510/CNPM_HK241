# Front-end của SSMS website

## Project structure
 - `assets`: dùng để thêm hình ảnh
 - `layout`: layout dùng chung cho tất cả các page (ví dụ như header và footer)
 - `pages`: các trang (ví dụ /home, /result-page)
 - `services`: các hàm để truy cập backend
 - `types`: định nghĩa các interface hoặc type
## Hướng dẫn chạy
## Hướng dẫn chạy và các lệnh cơ bản:
 - `npm install`: sau khi pull code về để tải các tài nguyên.
 - Tạo file `.env`, trong file này điền các thông tin sau hoặc tham khảo file `.env.example`:
    VITE_API_URL=http://localhost:<PORT>
 - `npm run dev`: chạy dev server
 - `npm run build`: build ra dist/ (run build sử dụng npx server dist)
 - `npm run test`: test
 - `npm run fmt`: format sử dụng prettier
 - `npm run lint`: check code
## Hướng dẫn code
 - Code rõ ràng
 - Testing sau khi code xong: `npm run lint` (nếu có `WARNING` thì bỏ qua, tập trung các problem tô đỏ)
## Tailwind (optional)
 - Có thể dùng tailwind hoặc sử dụng css thuần
