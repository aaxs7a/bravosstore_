"use client";

import React, { useState } from "react";
import { BravosUser, supabase } from "../_lib/bravosSupabase";
import { toast } from "sonner";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: BravosUser | null;
  onUpdateUser: (updatedUser: BravosUser) => void;
}

export default function ProfileModal({
  isOpen,
  onClose,
  user,
  onUpdateUser,
}: ProfileModalProps) {
  const [name, setName] = useState(user?.name || "");
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen || !user) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const { error } = await supabase
        .from("users")
        .update({ name })
        .eq("id", user.id);

      if (error) throw error;

      onUpdateUser({ ...user, name });
      toast.success("Nome atualizado com sucesso!");
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Erro ao atualizar o nome.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#09090b] p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div>
            <span className="text-[10px] font-mono text-[#00ff66] tracking-widest uppercase">
              // PAINEL DE CREDENCIAIS
            </span>
            <h2 className="text-xl font-bold text-white uppercase italic">
              Perfil do Utilizador
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white text-lg"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Nome de Utilizador (Editável) */}
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1 flex items-center gap-2">
              <span aria-hidden="true" className="text-[#00ff66]">●</span> Nome Completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/70 px-4 py-2.5 text-sm text-white focus:border-[#00ff66] focus:outline-none focus:ring-1 focus:ring-[#00ff66] transition"
              required
            />
          </div>

          {/* E-mail (Apenas Leitura) */}
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-500 mb-1 flex items-center gap-2">
              <span aria-hidden="true">✉</span> E-mail
            </label>
            <input
              type="email"
              disabled
              value={user.email || "usuario@bravos.com"}
              className="w-full rounded-lg border border-zinc-800/50 bg-zinc-950/80 px-4 py-2.5 text-sm text-zinc-500 cursor-not-allowed"
            />
          </div>

          {/* Grid com CPF e Data de Nascimento */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-500 mb-1 flex items-center gap-2">
                <span aria-hidden="true">▤</span> CPF
              </label>
              <input
                type="text"
                disabled
                value={"***.***.***-**"}
                className="w-full rounded-lg border border-zinc-800/50 bg-zinc-950/80 px-4 py-2.5 text-sm text-zinc-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-500 mb-1 flex items-center gap-2">
                <span aria-hidden="true">▦</span> Nascimento
              </label>
              <input
                type="text"
                disabled
                value={"**/**/****"}
                className="w-full rounded-lg border border-zinc-800/50 bg-zinc-950/80 px-4 py-2.5 text-sm text-zinc-500 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Senha Criptografada */}
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-500 mb-1 flex items-center gap-2">
              <span aria-hidden="true">▣</span> Password Criptografada
            </label>
            <div className="relative">
              <input
                type="password"
                disabled
                value="********************"
                className="w-full rounded-lg border border-zinc-800/50 bg-zinc-950/80 px-4 py-2.5 text-sm text-zinc-500 cursor-not-allowed font-mono"
              />
              <span className="absolute right-3 top-2.5 text-[10px] font-mono text-[#00ff66] flex items-center gap-1">
                <span aria-hidden="true">✓</span> E2E Encrypted
              </span>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-zinc-800 text-xs font-mono uppercase text-zinc-400 hover:bg-zinc-900"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 rounded-lg bg-[#00ff66] text-black text-xs font-bold font-mono uppercase hover:bg-emerald-400 transition disabled:opacity-50"
            >
              {isSaving ? "A Guardar..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}