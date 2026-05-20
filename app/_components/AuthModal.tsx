"use client";

/*
  ARQUIVO: AuthModal.tsx
  Função: cria a janela de Entrar/Cadastrar.
  Aqui o usuário pode criar uma conta simples ou fazer login.
  Os dados ficam salvos no localStorage do navegador, então serve para teste/apresentação, não como banco real.
*/

// Componente do modal de login e cadastro. Ele salva usuários no localStorage para simular autenticação sem banco de dados.

import React, { useState } from 'react';

export interface BravosUser {
  name: string;
  email: string;
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
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

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

  const resetFields = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setMessage('');
  };

  const switchMode = () => {
    setMode((current) => current === 'login' ? 'register' : 'login');
    resetFields();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanEmail || !password || (mode === 'register' && !cleanName)) {
      setMessage('Preencha todos os campos obrigatórios.');
      return;
    }

    if (!cleanEmail.includes('@')) {
      setMessage('Digite um e-mail válido.');
      return;
    }

    const users = getUsers();

    if (mode === 'register') {
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

      const newUser: StoredUser = { name: cleanName, email: cleanEmail, password };
      saveUsers([...users, newUser]);
      localStorage.setItem('bravos_logged_user', JSON.stringify({ name: cleanName, email: cleanEmail }));
      onLoginSuccess({ name: cleanName, email: cleanEmail });
      resetFields();
      onClose();
      return;
    }

    const foundUser = users.find((user) => user.email === cleanEmail && user.password === password);
    if (!foundUser) {
      setMessage('E-mail ou senha incorretos.');
      return;
    }

    localStorage.setItem('bravos_logged_user', JSON.stringify({ name: foundUser.name, email: foundUser.email }));
    onLoginSuccess({ name: foundUser.name, email: foundUser.email });
    resetFields();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
      <button aria-label="Fechar login" onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default" />

      <div className="relative w-full max-w-md bg-[#09090b] border border-zinc-800 rounded-3xl shadow-[0_0_60px_rgba(0,255,102,0.08)] overflow-hidden">
        <div className="p-6 border-b border-zinc-900 flex items-start justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono text-[#00ff66] tracking-[0.25em] uppercase">// Área do Cliente</span>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-wide mt-1">
              {mode === 'login' ? 'Entrar' : 'Cadastro'}
            </h2>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full border border-zinc-800 text-zinc-400 hover:text-[#00ff66] hover:border-[#00ff66] transition-all cursor-pointer">×</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'register' && (
            <div className="space-y-2">
              <label className="text-[11px] font-mono font-black text-zinc-400 uppercase tracking-widest">Nome</label>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Seu nome" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00ff66] transition-colors" />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[11px] font-mono font-black text-zinc-400 uppercase tracking-widest">E-mail</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email@exemplo.com" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00ff66] transition-colors" />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-mono font-black text-zinc-400 uppercase tracking-widest">Senha</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Mínimo 6 caracteres" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00ff66] transition-colors" />
          </div>

          {mode === 'register' && (
            <div className="space-y-2">
              <label className="text-[11px] font-mono font-black text-zinc-400 uppercase tracking-widest">Confirmar senha</label>
              <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Repita sua senha" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00ff66] transition-colors" />
            </div>
          )}

          {message && <p className="text-xs font-mono text-red-400 bg-red-950/20 border border-red-900/40 rounded-xl p-3">{message}</p>}

          <button type="submit" className="w-full bg-[#00ff66] hover:bg-[#00e055] text-black font-black text-xs tracking-[0.2em] uppercase py-4 rounded-xl cursor-pointer transition-transform active:scale-[0.99]">
            {mode === 'login' ? 'Entrar na conta' : 'Criar conta'}
          </button>

          <button type="button" onClick={switchMode} className="w-full text-xs font-mono text-zinc-400 hover:text-[#00ff66] uppercase tracking-widest transition-colors cursor-pointer">
            {mode === 'login' ? 'Ainda não tenho conta' : 'Já tenho conta'}
          </button>
        </form>
      </div>
    </div>
  );
}
