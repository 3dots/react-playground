import logoImg from '@/assets/forms-logo.jpg';

export function Header() {
  return (
    <header>
      <img src={logoImg} alt="A form and a pencil" className='mx-auto'/>
      <h1>React Forms</h1>
    </header>
  );
}