# Backend using Nestjs + Prisma
## Project structure:
- `src`: dùng để tạo các thư mục như auth, user và tạo các file như: controller, service và module.
- `prisma`: dùng để viết các model (giống viết các relation trong database)
## Hướng dẫn chạy và các lệnh cơ bản:
- `npm install`: sau khi pull code về để tải các tài nguyên.
- Tạo file `.env`, trong file này điền các thông tin sau hoặc tham khảo file `.env.example`:
    - DATABASE_URL="mysql://<your_username>:<your_password>@<your_database_domain>:<your_port>/<your_database_name>?schema=public"
    - JWT_SECRET=
    - PORT=5000
Docker:
    MYSQLDB_ROOT_PASSWORD=
    MYSQLDB_USER=
    MYSQLDB_PASSWORD=
    MYSQLDB_DATABASE=
    MYSQLDB_LOCAL_PORT=
    MYSQLDB_DOCKER_PORT=
    DATABASE_URL="mysql://<your_username>:<your_password>@<your_database_domain>:<your_port>/<your_database_name>?schema=public"
- `npm run db:dev:restart`: khởi động docker
- `npx prisma migrate dev --name init`: để migrate prisma.schema vào database trống.
- `npm run start:dev`: khởi động server.
- `npx prisma studio`: hiển thị phần database.
- `nest g module <folder name>`: nestjs sẽ tự động folder có tên là <folder_name> cho chúng ta trong thư mục `src`, bao gồm file `module`.
- `nest g controller <folder name>`: nestjs sẽ tự động folder có tên là <folder_name> cho chúng ta trong thư mục `src`, bao gồm file `controller`.
- `nest g service <folder name>`: nestjs sẽ tự động folder có tên là <folder_name> cho chúng ta trong thư mục `src`, bao gồm file `service`.

## Hướng dẫn code:
- Code rõ ràng
- Documentation of nestjs: [https://docs.nestjs.com/]
- Đối với mỗi module trong `src` sẽ bao gồm:
    - `<file_name>.module.ts`: bao gồm
        - Providers: [] -> khi khởi tạo đã được thêm sẵn.
        - Controllers: [] -> khi khởi tạo đã được thêm sẵn.
    - `<file_name>.controller.ts`: được dùng để định nghĩa các API.
    - `<file_name>.service.ts`: được dùng để định nghĩa các hàm sử dụng cho controller.
    - Folder `dto`: được dùng để định nghĩa các class, interface, ...