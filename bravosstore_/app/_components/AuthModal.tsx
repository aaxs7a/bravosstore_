"use client";

/*
  ARQUIVO: AuthModal.tsx
  Função: cria a janela de Entrar/Cadastrar/Recuperar Senha.
  Aqui o usuário pode criar uma conta simples, fazer login ou ver a senha esquecida.
  Os dados ficam salvos no localStorage do navegador, então serve para teste/apresentação.
*/

import React, { useState } from 'react';

export interface BravosUser {
  name: string;
  email: string;
  cpf?: string;
}

interface StoredUser extends BravosUser {
  password: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: BravosUser) => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Estados para controlar a visibilidade das senhas (o olho)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

<<<<<<< HEAD
=======
  // Valida email padrão ( letras & números + @ + domínio + extensão )
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  // Faz a requisição de: Mínimo 6 caracteres, pelo menos 1 letra maiúscula e uma minúscula e 1 número
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

>>>>>>> main
  if (!isOpen) return null;

  // Busca a lista de usuários cadastrados no navegador.
  const getUsers = (): StoredUser[] => {
    try {
      const savedUsers = localStorage.getItem('bravos_users');
      return savedUsers ? JSON.parse(savedUsers) : [];
    } catch {
      return [];
    }
  };

  // Salva a lista de usuários no navegador.
  const saveUsers = (users: StoredUser[]) => {
    localStorage.setItem('bravos_users', JSON.stringify(users));
  };

  // Máscara de CPF em tempo real (000.000.000-00)
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 9) {
      value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})$/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/^(\d{3})(\d{3})(\d{1,3})$/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/^(\d{3})(\d{1,3})$/, '$1.$2');
    }
    setCpf(value);
  };

  const resetFields = () => {
    setName('');
    setEmail('');
    setCpf('');
    setPassword('');
    setConfirmPassword('');
    setMessage('');
    setSuccessMessage('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleForgotPasswordSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');
    setSuccessMessage('');
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
<<<<<<< HEAD
      setMessage('Por favor, informe seu e-mail.');
=======
      setMessage('Por favor, info rme seu e-mail.');
      return;
    }

    // Validação com regex na recuperação de senha
    if (!emailRegex.test(cleanEmail)) {
      setMessage('Insira um formato de e-mail válido ( Ex: seu@email.com)');
>>>>>>> main
      return;
    }

    const users = getUsers();
    const foundUser = users.find((user) => user.email === cleanEmail);

    if (!foundUser) {
      setMessage('Este e-mail não foi encontrado no sistema.');
      return;
    }

    // Como roda em localStorage, exibe a senha direto para fins de teste na apresentação!
    setSuccessMessage(`Recuperação enviada! Token gerado para ${cleanEmail}. (Para teste: sua senha é "${foundUser.password}")`);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');
    setSuccessMessage('');
<<<<<<< HEAD
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanCpf = cpf.replace(/\D/g, '');

    if (!cleanEmail || !password || (mode === 'register' && (!cleanName || !cpf))) {
      setMessage('Preencha todos os campos obrigatórios.');
      return;
    }

    if (!cleanEmail.includes('@')) {
      setMessage('Digite um e-mail válido.');
      return;
    }

    const users = getUsers();

    if (mode === 'register') {
      if (cleanCpf.length !== 11) {
        setMessage('Digite um CPF válido com 11 dígitos.');
        return;
      }

      if (password.length < 6) {
        setMessage('A senha precisa ter pelo menos 6 caracteres.');
        return;
      }

      if (password !== confirmPassword) {
        setMessage('As senhas não conferem.');
        return;
      }

      const alreadyExists = users.some((user) => user.email === cleanEmail);
      if (alreadyExists) {
        setMessage('Este e-mail já está cadastrado. Faça login.');
        return;
      }

      const newUser: StoredUser = { name: cleanName, email: cleanEmail, cpf, password };
      saveUsers([...users, newUser]);
      localStorage.setItem('bravos_logged_user', JSON.stringify({ name: cleanName, email: cleanEmail, cpf }));
      onLoginSuccess({ name: cleanName, email: cleanEmail, cpf });
      resetFields();
      onClose();
      return;
    }

    const foundUser = users.find((user) => user.email === cleanEmail && user.password === password);
    if (!foundUser) {
      setMessage('E-mail ou senha incorretos.');
      return;
    }

    localStorage.setItem('bravos_logged_user', JSON.stringify({ name: foundUser.name, email: foundUser.email, cpf: foundUser.cpf }));
    onLoginSuccess({ name: foundUser.name, email: foundUser.email, cpf: foundUser.cpf });
    resetFields();
    onClose();
=======

    const users = getUsers();
    const cleanEmail = email.trim().toLowerCase();

    if (mode === 'register') {
      // 1. Validação de campos vazios
      if (!name || !cpf || !email || !password || !confirmPassword) {
        setMessage('Todos os campos são obrigatórios.');
        return;
      }

      // 2. Validação se as senhas são iguais
      if (password !== confirmPassword) {
        setMessage('As senhas não coincidem.');
        return;
      }

      // 3. Validação do Regex de E-mail
      if (!emailRegex.test(cleanEmail)) {
        setMessage('Insira um e-mail válido.');
        return;
      }

      // 4. Validação do Regex de Senha Forte (Trava de segurança efetiva)
      if (!passwordRegex.test(password)) {
        setMessage('A senha deve ter no mínimo 6 caracteres, incluindo pelo menos uma letra maiúscula, uma minúscula e um número.');
        return;
      }

      // Verifica se o e-mail já existe
      if (users.some((u) => u.email === cleanEmail)) {
        setMessage('Este e-mail já está cadastrado.');
        return;
      }

      // Cria e salva o novo usuário
      const newUser: StoredUser = { name, cpf, email: cleanEmail, password };
      const updatedUsers = [...users, newUser];
      saveUsers(updatedUsers);

      // Define a sessão ativa
      const sessionUser: BravosUser = { name, email: cleanEmail, cpf };
      localStorage.setItem('bravos_logged_user', JSON.stringify(sessionUser));
      
      onLoginSuccess(sessionUser);
      resetFields();
      onClose();

    } else {
      // --- MODO LOGIN ---
      if (!cleanEmail || !password) {
        setMessage('Por favor, preencha todos os campos.');
        return;
      }

      const foundUser = users.find((user) => user.email === cleanEmail && user.password === password);
      
      if (!foundUser) {
        setMessage('E-mail ou senha incorretos.');
        return;
      }

      // Salva sessão do usuário validado no login
      const sessionUser: BravosUser = { name: foundUser.name, email: foundUser.email, cpf: foundUser.cpf };
      localStorage.setItem('bravos_logged_user', JSON.stringify(sessionUser));
      
      onLoginSuccess(sessionUser);
      resetFields();
      onClose();
    }
>>>>>>> main
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
      <button aria-label="Fechar login" onClick={() => { resetFields(); onClose(); }} className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default" />

      <div className="relative w-full max-w-md bg-[#09090b] border border-zinc-800 rounded-3xl shadow-[0_0_60px_rgba(0,255,102,0.08)] overflow-hidden">
        <div className="p-6 border-b border-zinc-900 flex items-start justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono text-[#00ff66] tracking-[0.25em] uppercase">// Área do Cliente</span>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide mt-1">
              {mode === 'login' && 'Entrar'}
              {mode === 'register' && 'Cadastro'}
              {mode === 'forgot' && 'Recuperar Senha'}
            </h2>
          </div>
          <button onClick={() => { resetFields(); onClose(); }} className="w-9 h-9 rounded-full border border-zinc-800 text-zinc-400 hover:text-[#00ff66] hover:border-[#00ff66] transition-all cursor-pointer">×</button>
        </div>

        {mode !== 'forgot' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {mode === 'register' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-mono font-black text-zinc-400 uppercase tracking-widest">Nome</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Seu nome" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00ff66] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-mono font-black text-zinc-400 uppercase tracking-widest">CPF</label>
                  <input value={cpf} onChange={handleCpfChange} type="text" placeholder="000.000.000-00" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00ff66] transition-colors" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[11px] font-mono font-black text-zinc-400 uppercase tracking-widest">E-mail</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@exemplo.com" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00ff66] transition-colors" />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-mono font-black text-zinc-400 uppercase tracking-widest">Senha</label>
              <div className="relative">
                <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="Mínimo 6 caracteres" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-[#00ff66] transition-colors" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer">
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                  )}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div className="space-y-2">
                <label className="text-[11px] font-mono font-black text-zinc-400 uppercase tracking-widest">Confirmar senha</label>
                <div className="relative">
                  <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type={showConfirmPassword ? "text" : "password"} placeholder="Repita sua senha" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-[#00ff66] transition-colors" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer">
                    {showConfirmPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                    )}
                  </button>
                </div>
              </div>
            )}

<<<<<<< HEAD
            {/* Link de Esqueceu a Senha realocado para cima dos botões de submit */}
=======
>>>>>>> main
            {mode === 'login' && (
              <div className="flex justify-end pt-0.5">
                <button type="button" onClick={() => { setMessage(''); setMode('forgot'); }} className="text-[11px] font-mono text-zinc-500 hover:text-[#00ff66] tracking-wider uppercase transition-colors">
                  Esqueceu a senha?
                </button>
              </div>
            )}

            {message && <p className="text-xs font-mono text-red-400 bg-red-950/20 border border-red-900/40 rounded-xl p-3">⚠ {message}</p>}

            <button type="submit" className="w-full bg-[#00ff66] hover:bg-[#00e055] text-black font-black text-xs tracking-[0.2em] uppercase py-4 rounded-xl cursor-pointer transition-transform active:scale-[0.99]">
              {mode === 'login' ? 'Entrar na conta' : 'Criar conta'}
            </button>

            <button type="button" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); resetFields(); }} className="w-full text-xs font-mono text-zinc-400 hover:text-[#00ff66] uppercase tracking-widest transition-colors cursor-pointer">
              {mode === 'login' ? 'Ainda não tenho uma conta' : 'Já tenho uma conta'}
            </button>
          </form>
        ) : (
<<<<<<< HEAD
          /* FORMULÁRIO DE ESQUECEU A SENHA */
          <form onSubmit={handleForgotPasswordSubmit} className="p-6 space-y-4">
=======
          <form onSubmit={handleForgotPasswordSubmit} className="p-6 space-y-4">
            {/* FORMULÁRIO DE ESQUECEU A SENHA */}
>>>>>>> main
            <p className="text-xs font-mono text-zinc-400 leading-relaxed uppercase tracking-wider text-center">
              Informe seu e-mail para recuperar as credenciais de acesso.
            </p>

            <div className="space-y-2">
              <label className="text-[11px] font-mono font-black text-zinc-400 uppercase tracking-widest">E-mail Cadastrado</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@exemplo.com" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00ff66] transition-colors" />
            </div>

            {message && <p className="text-xs font-mono text-red-400 bg-red-950/20 border border-red-900/40 rounded-xl p-3">⚠ {message}</p>}
            {successMessage && <p className="text-xs font-mono text-[#00ff66] bg-emerald-950/20 border border-[#00ff66]/40 rounded-xl p-3">✓ {successMessage}</p>}

            <button type="submit" className="w-full bg-[#00ff66] hover:bg-[#00e055] text-black font-black text-xs tracking-[0.2em] uppercase py-4 rounded-xl cursor-pointer transition-transform active:scale-[0.99]">
              Recuperar Acesso
            </button>

            <button type="button" onClick={() => { setMode('login'); resetFields(); }} className="w-full bg-zinc-950 text-zinc-400 hover:text-[#00ff66] font-mono text-xs tracking-[0.2em] uppercase py-4 rounded-xl cursor-pointer transition-transform active:scale-[0.99] block text-center">
              ← Voltar para o Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}