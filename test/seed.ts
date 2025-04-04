import * as path from 'path'
import { DataSource } from 'typeorm'
import { User } from 'src/user/entity'
import { Company } from 'src/company/entity'
import { AppDataSource } from 'src/database/data-source.database'
import { Content } from 'src/content/entity'
import { ContentType } from 'src/content-types/entity'

export const seedDatabase = async (dataSource: DataSource) => {
  const queryRunner = dataSource.createQueryRunner()
  await queryRunner.connect()

  const company1 = queryRunner.manager.create(Company, { name: 'Company A' })
  const company2 = queryRunner.manager.create(Company, { name: 'Company B' })

  const contentPdf = queryRunner.manager.create(ContentType, {
    id: '2b8fad37-ea14-4643-9580-58953c42a17a',
    name: 'pdf',
    pdf_author: 'Unknown',
    pdf_pages: 1,
    pdf_encrypted: false,
  })

  const contentImg = queryRunner.manager.create(ContentType, {
    id: 'ce3c1bb5-4e00-4a3b-9039-a5bd90d224be',
    name: 'image',
    image_resolution: '1920x1080',
    image_aspect_ratio: '16:9',
  })

  const contentVideo = queryRunner.manager.create(ContentType, {
    id: '24e34bc0-8a17-4c69-aeeb-6a5095bd9fa0',
    name: 'video',
    video_duration: 10,
    video_resolution: '1080p',
  })

  const contentLink = queryRunner.manager.create(ContentType, {
    id: '1a110d76-4997-4412-a3dd-ab147ca76f3b',
    name: 'link',
    link_trusted: true,
    link_redirects: 0,
  })

  const contentText = queryRunner.manager.create(ContentType, {
    id: 'ce3c1bb5-8a17-4412-9039-6a5095bd9fa0',
    name: 'text',
  })

  const [createdCompany1, createdCompany2] = await Promise.all([
    queryRunner.manager.save(company1),
    queryRunner.manager.save(company2),
  ])

  const [createdPdf, createdImg, createdVideo, createdLink, createdText] = await Promise.all([
    queryRunner.manager.save(contentPdf),
    queryRunner.manager.save(contentImg),
    queryRunner.manager.save(contentVideo),
    queryRunner.manager.save(contentLink),
    queryRunner.manager.save(contentText),
  ])

  const user1 = queryRunner.manager.create(User, {
    id: '18c37ce2-cd34-4305-9ca4-c15fc736beac',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    password: 'hashed-password',
    company: createdCompany1,
  })

  const user2 = queryRunner.manager.create(User, {
    name: 'Foo Bar',
    email: 'foo@example.com',
    role: 'admin',
    password: 'hashed-password',
    company: createdCompany2,
  })

  await Promise.all([queryRunner.manager.save(user1), queryRunner.manager.save(user2)])

  await Promise.all([
    queryRunner.manager.save(
      queryRunner.manager.create(Content, {
        id: '4372ebd1-2ee8-4501-9ed5-549df46d0eb0',
        title: 'Introdução à Cultura Tech',
        description: 'Uma imagem ilustrativa sobre a cultura de trabalho em equipe.',
        url: 'http://localhost:3000/uploads/image1.jpg',
        cover: 'http://localhost:3000/uploads/image1-cover.jpg',
        type: createdImg.name,
        total_likes: 0,
        format: path.extname('http://localhost:3000/uploads/image1.jpg').slice(1) || 'jpg',
        contentType: createdImg,
        company: createdCompany1,
      }),
    ),
    queryRunner.manager.save(
      queryRunner.manager.create(Content, {
        id: '26a42e72-cc93-44b3-acae-01537a36322b',
        title: 'Ambiente de Trabalho Moderno',
        description:
          'Uma imagem representando espaços colaborativos e inovação nas empresas de tecnologia.',
        url: 'http://localhost:3000/uploads/image2.png',
        cover: 'http://localhost:3000/uploads/image2-cover.jpg',
        type: createdImg.name,
        total_likes: 2,
        format: path.extname('http://localhost:3000/uploads/image2.jpg').slice(1) || 'jpg',
        contentType: createdImg,
        company: createdCompany1,
      }),
    ),
    queryRunner.manager.save(
      queryRunner.manager.create(Content, {
        id: '7acff1c5-4c43-4923-a323-d22a12573041',
        title: 'Guia de Boas Práticas em Desenvolvimento',
        description:
          'Um documento detalhado sobre boas práticas de programação e metodologias ágeis.',
        url: 'http://localhost:3000/uploads/pdf1.pdf',
        cover: 'http://localhost:3000/uploads/pdf1-cover.jpg',
        type: createdPdf.name,
        total_likes: 4,
        format: 'pdf',
        contentType: createdPdf,
        company: createdCompany1,
      }),
    ),
    queryRunner.manager.save(
      queryRunner.manager.create(Content, {
        id: '3a5a94aa-17da-4e9a-b493-fe7e81294631',
        title: 'Manual de Arquitetura de Software',
        description:
          'Um manual técnico abordando padrões arquiteturais e boas práticas para sistemas escaláveis.',
        url: 'http://localhost:3000/uploads/pdf2.pdf',
        cover: 'http://localhost:3000/uploads/pdf2-cover.jpg',
        type: createdPdf.name,
        total_likes: 6,
        format: 'pdf',
        contentType: createdPdf,
        company: createdCompany2,
      }),
    ),
    queryRunner.manager.save(
      queryRunner.manager.create(Content, {
        id: '6969d6c7-40ea-4a3c-b635-d6546b971304',
        title: 'Plataforma de Aprendizado Online',
        description:
          'Acesse este link para cursos e treinamentos voltados para tecnologia e inovação.',
        url: 'https://learning.rocks',
        cover: null,
        type: createdLink.name,
        total_likes: 8,
        format: null,
        contentType: createdLink,
        company: createdCompany1,
      }),
    ),
    queryRunner.manager.save(
      queryRunner.manager.create(Content, {
        id: 'd060ab17-c961-4de7-929f-a0d52aa3ecf4',
        title: 'Inteligência artificial',
        description: null,
        url: 'http://localhost:3000/uploads/video1.mp4',
        cover: 'http://localhost:3000/uploads/video1-cover.jpg',
        type: createdVideo.name,
        total_likes: 10,
        format: path.extname('http://localhost:3000/uploads/video1.mp4').slice(1) || 'mp4',
        contentType: createdVideo,
        company: createdCompany1,
      }),
    ),
    queryRunner.manager.save(
      queryRunner.manager.create(Content, {
        id: 'd060ab17-c961-4de7-929f-a0d52aa3ecf8',
        title: 'Modulo 3 - concordância verbal - Curso de Língua Portuguesa',
        description: null,
        url: 'http://localhost:3000/uploads/text.txt',
        type: createdText.name,
        total_likes: 10,
        format: 'txt',
        contentType: createdText,
        company: createdCompany1,
      }),
    ),
  ])

  console.info('Database seeded successfully.')
  await queryRunner.release()

  process.exit(0)
}

AppDataSource.initialize()
  .then(() => seedDatabase(AppDataSource))
  .catch((err) => console.error('Error seeding database:', err))
