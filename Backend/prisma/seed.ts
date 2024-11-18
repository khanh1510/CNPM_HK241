import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  // Seed bảng user
  const students = Array.from({ length: 5 }).map(() => ({
    id: uuidv4(),
    email: `student${Math.random().toString(36).slice(-5)}@example.com`,
    password: '$argon2id$v=19$m=65536,t=3,p=4$hb2INvEyuhGNWt9nC/SGAQ$PDZsOe6lntLpD5AnCZKlm4RSfzF83BZCOhfj5X9gX5c',
    avatar_url: 'avatar_url/images.jpg',
    role: 'student',
  }));

  const spso = Array.from({ length: 2 }).map(() => ({
    id: uuidv4(),
    email: `spso${Math.random().toString(36).slice(-5)}@example.com`,
    password: '$argon2id$v=19$m=65536,t=3,p=4$hb2INvEyuhGNWt9nC/SGAQ$PDZsOe6lntLpD5AnCZKlm4RSfzF83BZCOhfj5X9gX5c',
    avatar_url: 'avatar_url/images.jpg',
    role: 'spso',
  }));

  const users = [...students, ...spso];
  await prisma.user.createMany({ data: users });

  // Seed bảng student
  const schoolYears = ['2021', '2022', '2023', '2024'];
  const studentData = students.map((student, index) => {
    const schoolYear = schoolYears[Math.floor(Math.random() * schoolYears.length)];
    const yearPrefix = schoolYear.slice(-2); // Lấy 2 số cuối của năm học
    const randomNumber = Math.floor(10000 + Math.random() * 90000).toString(); // Tạo số ngẫu nhiên 5 chữ số
    const mssv = yearPrefix + randomNumber; // Ghép thành MSSV
    return {
      id: student.id,
      name: `Sinh Viên ${index + 1}`,
      paper_balance: 20,
      school_year: schoolYear,
      mssv: mssv,
    };
  });
  await prisma.student.createMany({ data: studentData });

  // Seed bảng spso
  const spsoData = spso.map((spsoItem, index) => ({
    id: spsoItem.id,
    name: `Nhân Viên ${index + 1}`,
  }));
  await prisma.spso.createMany({ data: spsoData });

  // Seed bảng printer
  const printers = Array.from({ length: 10 }, (_, index) => {
    const campusPrefix = Math.random() > 0.5 ? 'LTK' : 'DA'; // Chọn campus ngẫu nhiên
    const id = `${campusPrefix}-${(index + 1).toString().padStart(5, '0')}`; // Tạo id theo thứ tự
    return {
      id, // id theo định dạng 'LTK-xxxxx' hoặc 'DA-xxxxx'
      name: `Printer ${index + 1}`,
      campus: campusPrefix === 'LTK' ? 'CS1 - Lý Thường Kiệt' : 'CS2 - Dĩ An',
      location: `H${Math.floor(Math.random() * 10)}-${Math.floor(Math.random() * 900 + 100)}`,
      status: 'able',
    };
  });

  await prisma.printer.createMany({
    data: printers,
  });

  // Seed bảng printing
  const printings = Array.from({ length: 15 }).map(() => ({
    id: uuidv4(),
    student_id: students[Math.floor(Math.random() * students.length)].id,
    printer_id: printers[Math.floor(Math.random() * printers.length)].id,
    spso_id: spso[Math.floor(Math.random() * spso.length)].id,
    status: ['waiting', 'printing', 'printed', 'received', 'cancel'][Math.floor(Math.random() * 5)],
  }));
  await prisma.printing.createMany({ data: printings });

  // Seed bảng file
  const files = printings.flatMap((printing) => [
    {
      printing_id: printing.id,
      name: 'file1',
      file_url: 'file_url/file1',
      file_size: 6.32,
      page_number: 20,
      copies_number: Math.floor(Math.random() * 3 + 1),
      page_type: 'A4',
      print_from_page: 1,
      print_to_page: 20,
      print_horizontal: false,
      left: 1.0,
      right: 1.0,
      top: 1.0,
      bottom: 1.0,
      single_sided: true,
    },
    {
      printing_id: printing.id,
      name: 'file2',
      file_url: 'file_url/file2',
      file_size: 0.1,
      page_number: 1,
      copies_number: Math.floor(Math.random() * 3 + 1),
      page_type: 'A4',
      print_from_page: 1,
      print_to_page: 1,
      print_horizontal: false,
      left: 1.0,
      right: 1.0,
      top: 1.0,
      bottom: 1.0,
      single_sided: true,
    },
  ]);
  await prisma.file.createMany({ data: files });

  // Seed bảng setting
  const settings = spso.map((spsoItem) => ({
    id: uuidv4(),
    spso_id: spsoItem.id,
    page_number: 20,
    page_price: 200,
    supply_date: new Date(),
  }));
  await prisma.setting.createMany({ data: settings });

  // Seed bảng file_types
  const fileTypes = [
    { setting_id: settings[0].id, type: '.pdf' },
    { setting_id: settings[0].id, type: '.docx' },
    { setting_id: settings[1].id, type: '.pdf' },
    { setting_id: settings[1].id, type: '.doc' },
    { setting_id: settings[1].id, type: '.docx' },
    { setting_id: settings[1].id, type: '.pptx' },
  ];
  await prisma.file_types.createMany({ data: fileTypes });

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
