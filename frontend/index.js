// local reviews data
const reviews = [
    {
      id: 1,
      name: 'Samantha',
      job: 'web developer',
      img: 'https://www.course-api.com/images/people/person-1.jpeg',
      text: "This app is a lifesaver for any busy professional. I can't believe how much more organized and efficient I've become since using it. The interface is sleek, and I love how it seamlessly integrates task management, team communication, and progress tracking. Kudos to the developers!"
    },
    {
      id: 2,
      name: 'Diana Kiptoo',
      job: 'web designer',
      img: 'https://www.course-api.com/images/people/person-2.jpeg',
      text: "As a freelancer, staying on top of multiple projects can be overwhelming. But with this app, I feel like I have a personal assistant guiding me every step of the way. It's like it understands exactly what I need and delivers it with elegance. Highly recommended!"
    },
    {
      id: 3,
      name: 'Mark ',
      job: 'intern',
      img: 'https://www.course-api.com/images/people/person-4.jpeg',
      text: "This app is like having a magic wand for productivity. The way it streamlines task assignment, progress tracking, and team communication is remarkable. My projects are more organized, and I feel in control like never before. Thank you for creating such a fantastic tool!",
    },
    {
      id: 4,
      name: 'Mark Allan',
      job: 'the boss',
      img: 'https://www.course-api.com/images/people/person-3.jpeg',
      text: "I was hesitant to switch from my old project management tool, but this app has blown me away. The customizable dashboards, Kanban boards, and Gantt charts have transformed the way I plan and execute projects. It's like having a Swiss Army knife for project management!",
    },
  ];
  // select items
  const img = document.getElementById('person-img');
  const author = document.getElementById('author');
  const job = document.getElementById('job');
  const info = document.getElementById('info');
  
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const randomBtn = document.querySelector('.random-btn');
  
  // set starting item
  let currentItem = 0;
  
  // load initial item
  window.addEventListener('DOMContentLoaded', function () {
    const item = reviews[currentItem];
    img.src = item.img;
    author.textContent = item.name;
    job.textContent = item.job;
    info.textContent = item.text;
  });
  
  // show person based on item
  function showPerson(person) {
    const item = reviews[person];
    img.src = item.img;
    author.textContent = item.name;
    job.textContent = item.job;
    info.textContent = item.text;
  }
  // show next person
  nextBtn.addEventListener('click', function () {
    currentItem++;
    if (currentItem > reviews.length - 1) {
      currentItem = 0;
    }
    showPerson(currentItem);
  });
  // show prev person
  prevBtn.addEventListener('click', function () {
    currentItem--;
    if (currentItem < 0) {
      currentItem = reviews.length - 1;
    }
    showPerson(currentItem);
  });
  // show random person
  randomBtn.addEventListener('click', function () {
    console.log('hello');
  
    currentItem = Math.floor(Math.random() * reviews.length);
    showPerson(currentItem);
  });
  