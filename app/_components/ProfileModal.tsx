"use client";

/*
  ARQUIVO: app/_components/ProfileModal.tsx
  FUNÇÃO: Modal de visualização e edição de dados do perfil do usuário.
*/

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { BravosUser, buscarUsuarioLogado, supabase } from "../_lib/bravosSupabase";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  loggedUser: BravosUser | null;
  onProfileUpdated: (user: BravosUser) => void;
}

export default function ProfileModal({
  isOpen,
  onClose,
  loggedUser,
  onProfileUpdated,
}: ProfileModalProps) {
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (loggedUser) {
      setEditName(loggedUser.name || "");
      setEditEmail(loggedUser.email || "");
    }
  }, [loggedUser]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsEditingName(false);
    setIsEditingEmail(false);
    onClose();
  };

  const handleSaveProfile = async () => {
    if (!loggedUser) {
      handleClose();
      return;
    }

    const hasNameChanged = isEditingName && editName !== loggedUser.name;
    const hasEmailChanged = isEditingEmail && editEmail !== loggedUser.email;

    if (!hasNameChanged && !hasEmailChanged) {
      handleClose();
      return;
    }

    try {
      setIsSaving(true);

      if (hasEmailChanged) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: editEmail,
        });
        if (emailError) throw emailError;
        toast.info("Verifique o novo e-mail para confirmar a alteração.");
      }

      if (hasNameChanged) {
        const { error: metaError } = await supabase.auth.updateUser({
          data: { name: editName },
        });
        if (metaError) throw metaError;

        await supabase
          .from("profiles")
          .update({ name: editName })
          .eq("id", loggedUser.id);
      }

      const usuarioAtualizado = await buscarUsuarioLogado();
      if (usuarioAtualizado) {
        onProfileUpdated(usuarioAtualizado);
      }

      toast.success("Perfil atualizado com sucesso!");
      handleClose();
    } catch (error: any) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error(error?.message || "Não foi possível atualizar o perfil.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#09090b] border border-zinc-800/80 p-6 rounded-2xl max-w-md w-full shadow-2xl space-y-6 relative">
        <div className="flex justify-between items-center pb-4 border-b border-zinc-800/80">
          <h2 className="text-white font-black text-lg uppercase tracking-wider italic">
            Configurações do Perfil
          </h2>
          <button
            onClick={handleClose}
            className="text-zinc-400 hover:text-white transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* NOME DO UTILIZADOR */}
          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">
              Nome do Utilizador
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                disabled={!isEditingName}
                className={`w-full bg-zinc-900 border rounded-xl pr-10 pl-4 py-2.5 text-zinc-300 text-sm focus:outline-none transition ${
                  isEditingName
                    ? "border-[#00ff66] focus:ring-1 focus:ring-[#00ff66] text-white opacity-100"
                    : "border-zinc-800 cursor-not-allowed opacity-80"
                }`}
              />
              <button
                type="button"
                onClick={() => setIsEditingName(!isEditingName)}
                className="absolute right-3 text-zinc-400 hover:text-[#00ff66] transition cursor-pointer"
                title="Editar nome"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* E-MAIL */}
          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">
              E-mail
            </label>
            <div className="relative flex items-center">
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                disabled={!isEditingEmail}
                className={`w-full bg-zinc-900 border rounded-xl pr-10 pl-4 py-2.5 text-zinc-300 text-sm focus:outline-none transition ${
                  isEditingEmail
                    ? "border-[#00ff66] focus:ring-1 focus:ring-[#00ff66] text-white opacity-100"
                    : "border-zinc-800 cursor-not-allowed opacity-80"
                }`}
              />
              <button
                type="button"
                onClick={() => setIsEditingEmail(!isEditingEmail)}
                className="absolute right-3 text-zinc-400 hover:text-[#00ff66] transition cursor-pointer"
                title="Editar e-mail"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* CPF */}
          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">
              CPF
            </label>
            <input
              type="text"
              value={(loggedUser as any)?.cpf || "Não informado"}
              disabled
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-300 text-sm focus:outline-none cursor-not-allowed opacity-80"
            />
          </div>

          {/* SENHA */}
          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">
              Senha
            </label>
            <input
              type="password"
              value="••••••••"
              disabled
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-300 text-sm focus:outline-none cursor-not-allowed opacity-80"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSaveProfile}
          disabled={isSaving}
          className="w-full bg-[#00ff66] text-black font-black uppercase tracking-widest py-3 rounded-xl hover:bg-emerald-400 transition cursor-pointer disabled:opacity-50"
        >
          {isSaving ? "Guardando..." : "Concluir"}
        </button>
      </div>
    </div>
  );
}