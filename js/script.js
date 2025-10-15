// Datos del quiz
const quizData = [
    {
        title: "Módulo 1: Inversión Propia",
        question: "Para pasar al siguiente nivel en tu carrera de ventas, debes invertir en un sistema de capacitación avanzado. ¿Cuál es tu reacción principal?",
        options: [
            "Buscaría una opción gratuita o muy barata para ver si funciona antes de invertir.",
            "Sé que la inversión en mi formación es el camino más rápido para cerrar ventas grandes, así que lo priorizo.",
            "Preguntaría a todos mis amigos si a ellos les ha funcionado antes de tomar una decisión."
        ],
        correctAnswer: 1,
        image: "images/module-1-investment.jpg"
    },
    {
        title: "Módulo 2: Enfoque del Valor",
        question: "Al vender un producto de alto valor ($5,000+), un closer con la mentalidad correcta se enfoca en...",
        options: [
            "El número de horas que el equipo tardó en crear ese producto o servicio.",
            "El retorno de inversión (ROI) masivo y la transformación que el cliente obtendrá con esa solución.",
            "Simplemente las características más llamativas y un descuento por cierre rápido."
        ],
        correctAnswer: 1,
        image: "images/module-2-value.jpg"
    },
    {
        title: "Módulo 3: Manejo del Rechazo",
        question: "Después de una presentación perfecta, el prospecto dice NO. ¿Qué hace un vendedor con aptitud High Ticket?",
        options: [
            "Me frustro y lo doy por perdido, asumiendo que el producto no era para él.",
            "Lo veo como una valiosa oportunidad para investigar la verdadera objeción y refinar mi estrategia para el próximo cliente.",
            "Inmediatamente le ofrezco la versión más barata para asegurar cualquier venta."
        ],
        correctAnswer: 1,
        image: "images/module-3-rejection.jpg"
    }
];

// Estado
let currentModule = 0;
let selectedAnswer = null;

// Elementos del DOM
const header = document.getElementById('header');
const quizModule = document.getElementById('quizModule');
const completion = document.getElementById('completion');
const quizCard = document.getElementById('quizCard');
const quizTitle = document.getElementById('quizTitle');
const quizQuestion = document.getElementById('quizQuestion');
const optionsContainer = document.getElementById('options');
const errorMessage = document.getElementById('errorMessage');
const submitButton = document.getElementById('submitButton');
const moduleImage = document.getElementById('moduleImage');

// Inicializar
function init() {
    loadModule(currentModule);
    quizModule.style.display = 'block';
}

// Cargar módulo
function loadModule(index) {
    const module = quizData[index];
    
    quizTitle.textContent = `Paso ${index + 1} de 3`;
    quizQuestion.textContent = module.question;
    moduleImage.src = module.image;
    moduleImage.alt = module.title;
    
    // Limpiar opciones
    optionsContainer.innerHTML = '';
    selectedAnswer = null;
    submitButton.disabled = true;
    errorMessage.classList.remove('show');
    quizCard.classList.remove('error');
    
    // Crear opciones
    module.options.forEach((option, i) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';
        radio.id = `option-${i}`;
        radio.value = i;
        
        const label = document.createElement('label');
        label.htmlFor = `option-${i}`;
        label.textContent = option;
        
        optionDiv.appendChild(radio);
        optionDiv.appendChild(label);
        optionsContainer.appendChild(optionDiv);
        
        // Event listeners
        radio.addEventListener('change', () => handleAnswerChange(i));
        optionDiv.addEventListener('click', () => {
            radio.checked = true;
            handleAnswerChange(i);
        });
    });
}

// Manejar cambio de respuesta
function handleAnswerChange(index) {
    selectedAnswer = index;
    submitButton.disabled = false;
    errorMessage.classList.remove('show');
    quizCard.classList.remove('error');
}

// Verificar respuesta
function checkAnswer() {
    const module = quizData[currentModule];
    
    if (selectedAnswer === module.correctAnswer) {
        // Respuesta correcta
        triggerConfetti();
        
        if (currentModule < quizData.length - 1) {
            // Siguiente módulo
            setTimeout(() => {
                currentModule++;
                loadModule(currentModule);
            }, 1000);
        } else {
            // Completado
            setTimeout(() => {
                quizModule.style.display = 'none';
                completion.classList.add('show');
                header.classList.add('hidden');
                triggerBigConfetti();
            }, 1000);
        }
    } else {
        // Respuesta incorrecta
        errorMessage.classList.add('show');
        quizCard.classList.add('error');
    }
}

// Confeti
function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#ec4899', '#3b82f6', '#10b981']
    });
}

function triggerBigConfetti() {
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#a855f7', '#ec4899', '#3b82f6', '#10b981']
    });
}

// Event listeners
submitButton.addEventListener('click', checkAnswer);

// Iniciar
init();
