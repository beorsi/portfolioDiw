/* ===== I18N — Dicionário de traduções ===== */
const translations = {
    pt: {
        nav_sobre:     'Sobre Mim',
        nav_projetos:  'Projetos',
        nav_exp:       'Experiências',
        nav_contato:   'Contato',
        hero_desc:     'Desenvolvedor Full Stack de aplicações web e mobile\nque usam dados reais e solucionam problemas.',
        hero_btn_proj: 'Ver projetos',
        hero_btn_cont: 'Contato',
        sobre_titulo:  'Quem sou eu:',
        sobre_sub:     'Opa! Sou o Bernardo, desenvolvedor Full Stack localizado no Brasil.',
        stat_anos:     'Anos de experiência',
        stat_tech:     'Tecnologias dominadas',
        tech_principais: 'Principais:',
        tech_tambem:   'Também conheço:',
        proj_titulo:   'Projetos:',
        proj1_desc:    'Plataforma de visualização de dados reais (OBIS — Ocean Biodiversity Information System) sobre espécies marítimas. Painel interativo com mapa dinâmico e visualização de diversas estatísticas.',
        proj2_titulo:  'Concessionária Flutter',
        proj2_desc:    'App mobile em desenvolvimento para demonstração de processos de concessionária de veículos.',
        exp_titulo:    'Experiências / Tecnologias',
        exp_traj:      'Trajetória Profissional',
        exp_cargo:     'Estagiário de TI',
        exp_desc:      'Suporte técnico, resolvendo problemas relacionados a hardware e softwares de geotecnia, auxiliando as equipes técnicas. Cadastro de usuários e permissões de acesso no servidor.',
        exp_stack:     'Stack de Tecnologias',
        exp_banco:     'Banco de Dados',
        cont_titulo:   'Contato',
        cont_chamada:  'Vamos construir algo incrível juntos?',
        cont_desc:     'Estou sempre aberto a novos projetos, parcerias e oportunidades. Se você tem uma ideia ou precisa de um desenvolvedor experiente para o seu time, entre em contato!',
        form_titulo:   'Enviar mensagem',
        form_nome:     'Nome',
        form_nome_ph:  'Seu nome completo',
        form_msg:      'Mensagem',
        form_msg_ph:   'Conte sobre seu projeto ou oportunidade...',
        form_btn:      'Enviar Mensagem',
    },
    en: {
        nav_sobre:     'About Me',
        nav_projetos:  'Projects',
        nav_exp:       'Experience',
        nav_contato:   'Contact',
        hero_desc:     'Full Stack Developer building web & mobile apps\nthat use real data and solve real problems.',
        hero_btn_proj: 'See projects',
        hero_btn_cont: 'Contact',
        sobre_titulo:  'Who am I:',
        sobre_sub:     'Hey! I\'m Bernardo, a Full Stack developer based in Brazil.',
        stat_anos:     'Years of experience',
        stat_tech:     'Technologies mastered',
        tech_principais: 'Main:',
        tech_tambem:   'Also know:',
        proj_titulo:   'Projects:',
        proj1_desc:    'Real-data visualization platform (OBIS — Ocean Biodiversity Information System) about marine species. Interactive panel with a dynamic map and various statistics.',
        proj2_titulo:  'Flutter Dealership App',
        proj2_desc:    'Mobile app in development showcasing vehicle dealership processes.',
        exp_titulo:    'Experience / Technologies',
        exp_traj:      'Professional Background',
        exp_cargo:     'IT Intern',
        exp_desc:      'Technical support, solving hardware and geotechnical software issues, assisting technical teams. User registration and server access permissions management.',
        exp_stack:     'Technology Stack',
        exp_banco:     'Databases',
        cont_titulo:   'Contact',
        cont_chamada:  'Let\'s build something amazing together?',
        cont_desc:     'I\'m always open to new projects, partnerships and opportunities. If you have an idea or need an experienced developer for your team, get in touch!',
        form_titulo:   'Send a message',
        form_nome:     'Name',
        form_nome_ph:  'Your full name',
        form_msg:      'Message',
        form_msg_ph:   'Tell me about your project or opportunity...',
        form_btn:      'Send Message',
    }
};

function applyLang(lang) {
    const t = translations[lang];
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');

    // Atualiza elementos com data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) el.textContent = t[key];
    });

    // Atualiza placeholders com data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key] !== undefined) el.setAttribute('placeholder', t[key]);
    });

    // Mostra/esconde blocos lang-pt / lang-en
    document.querySelectorAll('.lang-pt').forEach(el => {
        el.style.display = lang === 'pt' ? '' : 'none';
    });
    document.querySelectorAll('.lang-en').forEach(el => {
        el.style.display = lang === 'en' ? '' : 'none';
    });

    // Atualiza botão de idioma
    const flag  = document.getElementById('lang-flag');
    const label = document.getElementById('lang-label');
    if (lang === 'pt') {
        flag.textContent  = '🇧🇷';
        label.textContent = 'PT';
    } else {
        flag.textContent  = '🇺🇸';
        label.textContent = 'EN';
    }

    // Salva preferência
    localStorage.setItem('lang', lang);
}

// Botão PT/EN
const btnLang = document.getElementById('btn-lang');
btnLang.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-lang') || 'pt';
    applyLang(current === 'pt' ? 'en' : 'pt');
});

// Aplica idioma salvo (ou padrão pt)
applyLang(localStorage.getItem('lang') || 'pt');

/* ===== HAMBURGER MENU ===== */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});

// Fecha o menu ao clicar em um link
mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ===== FORMULÁRIO — Formspree ===== */
const formContato = document.getElementById('form-contato');
const formStatus  = document.getElementById('form-status');
const btnEnviar   = document.getElementById('btn-enviar');

formContato.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(formContato);
    btnEnviar.disabled = true;
    btnEnviar.textContent = 'Enviando...';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    try {
        const response = await fetch('https://formspree.io/f/xppqjoqn', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            formStatus.textContent = 'Mensagem enviada com sucesso! Obrigado pelo contato.';
            formStatus.classList.add('sucesso');
            formContato.reset();
        } else {
            const data = await response.json();
            if (data && data.errors) {
                formStatus.textContent = data.errors.map(err => err.message).join(', ');
            } else {
                formStatus.textContent = 'Ocorreu um erro ao enviar a mensagem. Tente novamente.';
            }
            formStatus.classList.add('erro');
        }
    } catch (error) {
        formStatus.textContent = 'Erro de conexão. Por favor, tente novamente mais tarde.';
        formStatus.classList.add('erro');
    } finally {
        btnEnviar.disabled = false;
        const lang = document.documentElement.getAttribute('data-lang') || 'pt';
        btnEnviar.textContent = translations[lang].form_btn;
    }
});

/* ===== SCROLL HELPERS ===== */
function scrollParaProjetos() {
    document.getElementById('projetos').scrollIntoView({ behavior: 'smooth' });
}

function scrollParaContato() {
    document.getElementById('contato').scrollIntoView({ behavior: 'smooth' });
}