
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('senha123', 10)
  
  const users = [
    { name: 'Teste Um', email: 'teste1@email.com', role: 'USER' },
    { name: 'Teste Dois', email: 'teste2@email.com', role: 'USER' },
    { name: 'Teste Admin', email: 'admin@email.com', role: 'ADMIN' },
    { name: 'Teste Critico', email: 'critico@email.com', role: 'CRITIC' },
  ]

  console.log(`Start seeding ...`)
  for (const u of users) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        email: u.email,
        name: u.name,
        password,
        role: u.role
      },
    })
    console.log(`Created user with id: ${user.id} and email: ${user.email}`)
  }

  const movies = [
    {
      title: 'Inception',
      year: 2010,
      synopsis: 'Um ladrão que rouba segredos corporativos através do uso de tecnologia de compartilhamento de sonhos recebe a tarefa inversa de plantar uma ideia na mente de um C.E.O.',
      genre: 'Ação, Aventura, Ficção Científica',
      cast: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page',
      posterUrl: 'https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg'
    },
    {
      title: 'The Dark Knight',
      year: 2008,
      synopsis: 'Quando a ameaça conhecida como o Coringa causa estragos e caos nas pessoas de Gotham, o Batman deve aceitar um dos maiores testes psicológicos e físicos de sua capacidade de lutar contra a injustiça.',
      genre: 'Ação, Crime, Drama',
      cast: 'Christian Bale, Heath Ledger, Aaron Eckhart',
      posterUrl: 'https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg'
    },
    {
      title: 'Interstellar',
      year: 2014,
      synopsis: 'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço em uma tentativa de garantir a sobrevivência da humanidade.',
      genre: 'Aventura, Drama, Ficção Científica',
      cast: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
      posterUrl: 'https://image.tmdb.org/t/p/original/gEU2QniL6C8zXtFaXD0fsKJ186.jpg'
    },
    {
      title: 'Parasite',
      year: 2019,
      synopsis: 'A ganância e a discriminação de classe ameaçam a recém-formada relação simbiótica entre a rica família Park e o clã Kim destituído.',
      genre: 'Drama, Suspense',
      cast: 'Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong',
      posterUrl: 'https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg'
    },
    {
      title: 'Spirited Away',
      year: 2001,
      synopsis: 'Durante a mudança de sua família para o subúrbio, uma menina de 10 anos vagueia por um mundo governado por deuses, bruxas e espíritos, onde os humanos são transformados em bestas.',
      genre: 'Animação, Aventura, Família',
      cast: 'Rumi Hiiragi, Miyu Irino, Mari Natsuki',
      posterUrl: 'https://image.tmdb.org/t/p/original/39wmItIWsg5sZMyRUKGnSxQbUgZ.jpg'
    },
    {
      title: 'The Godfather',
      year: 1972,
      synopsis: 'Abrangendo os anos de 1945 a 1955, uma crônica da família criminosa fictícia ítalo-americana Corleone. Quando o patriarca da família do crime organizado, Vito Corleone, mal sobrevive a uma tentativa de assassinato, seu filho mais novo, Michael, intervém para cuidar dos supostos assassinos, lançando uma campanha de vingança sangrenta.',
      genre: 'Crime, Drama',
      cast: 'Marlon Brando, Al Pacino, James Caan',
      posterUrl: 'https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg'
    },
    {
      title: 'Pulp Fiction',
      year: 1994,
      synopsis: 'As vidas de dois assassinos da máfia, um boxeador, a esposa de um gângster e dois bandidos de lanchonete se entrelaçam em quatro histórias de violência e redenção.',
      genre: 'Crime, Suspense',
      cast: 'John Travolta, Uma Thurman, Samuel L. Jackson',
      posterUrl: 'https://image.tmdb.org/t/p/original/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg'
    },
    {
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
      synopsis: 'Gandalf e Aragorn lideram o Mundo dos Homens contra o exército de Sauron para desviar o olhar de Frodo e Sam enquanto eles se aproximam da Montanha da Perdição com o Um Anel.',
      genre: 'Aventura, Fantasia, Ação',
      cast: 'Elijah Wood, Ian McKellen, Viggo Mortensen',
      posterUrl: 'https://image.tmdb.org/t/p/original/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg'
    },
    {
      title: 'The Good, the Bad and the Ugly',
      year: 1966,
      synopsis: 'Um caçador de recompensas se alia a um homem condenado num duelo contra um terceiro homem numa corrida para encontrar uma fortuna em ouro enterrado num cemitério remoto.',
      genre: 'Faroeste',
      cast: 'Clint Eastwood, Eli Wallach, Lee Van Cleef',
      posterUrl: 'https://image.tmdb.org/t/p/original/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg'
    },
    {
      title: 'Fight Club',
      year: 1999,
      synopsis: 'Um trabalhador de escritório insone e um fabricante de sabonetes despreocupado formam um clube de luta subterrâneo que evolui para algo muito maior.',
      genre: 'Drama',
      cast: 'Brad Pitt, Edward Norton, Helena Bonham Carter',
      posterUrl: 'https://image.tmdb.org/t/p/original/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'
    },
    {
      title: 'Forrest Gump',
      year: 1994,
      synopsis: 'As presidências de Kennedy e Johnson, a Guerra do Vietnã, o escândalo de Watergate e outros eventos históricos desenrolam-se através da perspectiva de um homem do Alabama com um QI de 75, cujo único desejo é reunir-se com sua namorada de infância.',
      genre: 'Comédia, Drama, Romance',
      cast: 'Tom Hanks, Robin Wright, Gary Sinise',
      posterUrl: 'https://image.tmdb.org/t/p/original/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg'
    },
    {
      title: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
      synopsis: 'Após a destruição da Estrela da Morte, as forças imperiais continuam a perseguir os rebeldes. Luke Skywalker busca treinamento Jedi com Yoda, enquanto Han Solo e a Princesa Leia fogem da frota imperial.',
      genre: 'Aventura, Ação, Ficção Científica',
      cast: 'Mark Hamill, Harrison Ford, Carrie Fisher',
      posterUrl: 'https://image.tmdb.org/t/p/original/7BuH8itoDDemLo6YJ2CBpjwNcOv.jpg'
    },
    {
      title: 'The Matrix',
      year: 1999,
      synopsis: 'Um hacker aprende com rebeldes misteriosos sobre a verdadeira natureza de sua realidade e seu papel na guerra contra seus controladores.',
      genre: 'Ação, Ficção Científica',
      cast: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss',
      posterUrl: 'https://image.tmdb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg'
    },
    {
      title: 'Goodfellas',
      year: 1990,
      synopsis: 'A história de Henry Hill e sua vida na máfia, abrangendo seu relacionamento com sua esposa Karen Hill e seus parceiros da máfia Jimmy Conway e Tommy DeVito no sindicato do crime ítalo-americano.',
      genre: 'Drama, Crime',
      cast: 'Robert De Niro, Ray Liotta, Joe Pesci',
      posterUrl: 'https://image.tmdb.org/t/p/original/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg'
    },
    {
      title: 'The Silence of the Lambs',
      year: 1991,
      synopsis: 'Uma jovem cadete do F.B.I. deve receber a ajuda de um assassino canibal encarcerado e manipulador para ajudar a capturar outro serial killer, um louco que esfola suas vítimas.',
      genre: 'Crime, Drama, Suspense',
      cast: 'Jodie Foster, Anthony Hopkins, Scott Glenn',
      posterUrl: 'https://image.tmdb.org/t/p/original/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg'
    },
    {
      title: 'Se7en',
      year: 1995,
      synopsis: 'Dois detetives, um novato e um veterano, caçam um serial killer que usa os sete pecados capitais como seus motivos.',
      genre: 'Crime, Mistério, Suspense',
      cast: 'Brad Pitt, Morgan Freeman, Gwyneth Paltrow',
      posterUrl: 'https://image.tmdb.org/t/p/original/6yoghtyTpznpBik8EngEmJskVUO.jpg'
    },
    {
      title: 'It\'s a Wonderful Life',
      year: 1946,
      synopsis: 'Um anjo é enviado do céu para ajudar um homem de negócios desesperadamente frustrado, mostrando-lhe como teria sido a vida se ele nunca tivesse existido.',
      genre: 'Drama, Família, Fantasia',
      cast: 'James Stewart, Donna Reed, Lionel Barrymore',
      posterUrl: 'https://image.tmdb.org/t/p/original/bSqt9rhDZx1Q7UZ86dBPKdNomp2.jpg'
    },
    {
      title: 'Seven Samurai',
      year: 1954,
      synopsis: 'Uma aldeia pobre sob ataque de bandidos recruta sete samurais desempregados para ajudá-los a se defender.',
      genre: 'Ação, Drama',
      cast: 'Toshiro Mifune, Takashi Shimura, Keiko Tsushima',
      posterUrl: 'https://image.tmdb.org/t/p/original/8OKmBV5BufzqzIFeUZPCFdAdhqW.jpg'
    },
    {
      title: 'City of God',
      year: 2002,
      synopsis: 'Nas favelas do Rio, os caminhos de dois garotos divergem enquanto um luta para se tornar um fotógrafo e o outro um chefão do crime.',
      genre: 'Drama, Crime',
      cast: 'Alexandre Rodrigues, Leandro Firmino, Phellipe Haagensen',
      posterUrl: 'https://image.tmdb.org/t/p/original/k7eYdWvhYQyKQoU2EOumpZS16JX.jpg'
    },
    {
      title: 'Life Is Beautiful',
      year: 1997,
      synopsis: 'Quando um bibliotecário judeu de mente aberta e seu filho se tornam vítimas do Holocausto, ele usa uma mistura perfeita de vontade, humor e imaginação para proteger seu filho dos perigos ao redor do acampamento.',
      genre: 'Comédia, Drama',
      cast: 'Roberto Benigni, Nicoletta Braschi, Giorgio Cantarini',
      posterUrl: 'https://image.tmdb.org/t/p/original/6tEJnwZWIXjUVkv7PM2BWVficap.jpg'
    }
  ]

  for (const m of movies) {
    // Check if movie already exists to avoid duplicates (naive check by title)
    const existing = await prisma.movie.findFirst({
        where: { title: m.title }
    });

    let movie;
    if (!existing) {
        movie = await prisma.movie.create({ data: m });
        console.log(`Created movie: ${m.title}`);
    } else {
        movie = await prisma.movie.update({
            where: { id: existing.id },
            data: { synopsis: m.synopsis, genre: m.genre } // Update synopsis to PT-BR
        });
        console.log(`Updated movie: ${m.title}`);
    }

    // Add reviews
    const userRole = await prisma.user.findFirst({ where: { role: 'USER' } });
    const criticRole = await prisma.user.findFirst({ where: { role: 'CRITIC' } });

    if (userRole && criticRole) {
      // Review from Regular User
      await prisma.review.create({
        data: {
          rating: Math.floor(Math.random() * 3) + 7, // Random rating 7-9
          comment: getRandomUserComment(m.title),
          userId: userRole.id,
          movieId: movie.id,
          isProfessional: false
        }
      });

      // Review from Critic
      await prisma.review.create({
        data: {
          rating: Math.floor(Math.random() * 2) + 8, // Random rating 8-10
          comment: getRandomCriticComment(m.title),
          userId: criticRole.id,
          movieId: movie.id,
          isProfessional: true
        }
      });
      console.log(`Added reviews for: ${m.title}`);
    }
  }

  console.log(`Seeding finished.`)
}

function getRandomUserComment(movieTitle: string) {
  const comments = [
    `Adorei assistir ${movieTitle}! Recomendo muito.`,
    `Um dos melhores filmes que já vi.`,
    `A história de ${movieTitle} é incrível.`,
    `Vale muito a pena o ingresso!`,
    `Sinceramente, esperava menos, mas ${movieTitle} me surpreendeu.`,
    `Muito emocionante, chorei no final.`,
    `Ação do início ao fim!`,
    `Clássico absoluto.`
  ];
  return comments[Math.floor(Math.random() * comments.length)];
}

function getRandomCriticComment(movieTitle: string) {
  const comments = [
    `${movieTitle} apresenta uma narrativa complexa e visualmente deslumbrante. Uma obra-prima técnica.`,
    `A direção é impecável, conduzindo o espectador por uma jornada emocional profunda em ${movieTitle}.`,
    `Embora o ritmo de ${movieTitle} seja lento em alguns momentos, a recompensa final é inegável.`,
    `Uma análise mordaz da sociedade contemporânea disfarçada de entretenimento. Brilhante.`,
    `As atuações em ${movieTitle} são dignas de Oscar, elevando o material a outro patamar.`,
    `A cinematografia de ${movieTitle} define novos padrões para o gênero.`,
    `Um roteiro inteligente que desafia as expectativas do público a cada virada.`
  ];
  return comments[Math.floor(Math.random() * comments.length)];
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
