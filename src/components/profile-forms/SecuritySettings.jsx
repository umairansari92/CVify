import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';
import api from '../../api/axios';
import { FaShieldAlt, FaTrash, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const securitySchema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup.string().min(8, "New password must be at least 8 characters").required("New password is required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword')], "Passwords must match")
    .required("Please confirm your new password"),
});

const SecuritySettings = () => {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    resolver: yupResolver(securitySchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  });

  const onChangePassword = async (data) => {
    setLoading(true);
    try {
      await api.patch("/auth/change-password", data);
      toast.success("🔐 Password updated securely!");
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const onDeleteAccount = async () => {
    if (window.confirm("⚠️ DANGER: This will permanently delete your account and all portfolio data. This action is irreversible. Proceed?")) {
        try {
            await api.delete("/auth/profile");
            toast.success("Account deleted. Redirecting...");
            setTimeout(() => window.location.href = "/", 2000);
        } catch (err) {
            toast.error("Failed to delete account");
        }
    }
  };

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="pb-6 border-b border-border-subtle space-y-1">
            <h3 className="text-xl font-black text-text-main flex items-center gap-3">
                <FaLock className="text-primary" /> Authentication Control
            </h3>
            <p className="text-[10px] text-text-muted font-black uppercase tracking-widest leading-loose opacity-60">
                Secure your workspace. Use high-entropy passwords.
            </p>
        </div>

        <form onSubmit={handleSubmit(onChangePassword)} className="max-w-md space-y-6">
            <div className="space-y-2">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1 opacity-60">Current Password</label>
                <input
                    type="password"
                    {...register('currentPassword')}
                    className="w-full px-5 py-4 rounded-2xl border border-border-subtle bg-foreground/10 text-text-main focus:border-primary/50 outline-none transition-all font-semibold text-sm"
                />
                {errors.currentPassword && <p className="text-red-500 text-[9px] font-black uppercase ml-1">{errors.currentPassword.message}</p>}
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1 opacity-60">New Secure Password</label>
                <input
                    type="password"
                    {...register('newPassword')}
                    className="w-full px-5 py-4 rounded-2xl border border-border-subtle bg-foreground/10 text-text-main focus:border-primary/50 outline-none transition-all font-semibold text-sm"
                />
                {errors.newPassword && <p className="text-red-500 text-[9px] font-black uppercase ml-1">{errors.newPassword.message}</p>}
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1 opacity-60">Confirm New Password</label>
                <input
                    type="password"
                    {...register('confirmPassword')}
                    className="w-full px-5 py-4 rounded-2xl border border-border-subtle bg-foreground/10 text-text-main focus:border-primary/50 outline-none transition-all font-semibold text-sm"
                />
                {errors.confirmPassword && <p className="text-red-500 text-[9px] font-black uppercase ml-1">{errors.confirmPassword.message}</p>}
            </div>

            <button
                type="submit"
                disabled={loading || !isDirty}
                className="px-8 py-3 bg-primary hover:bg-primary/80 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
                {loading ? "Updating..." : "Rotate Credentials"}
            </button>
        </form>
      </section>

      <section className="pt-12 border-t border-red-500/10 space-y-6">
        <div className="space-y-1">
            <h3 className="text-xl font-black text-red-500 flex items-center gap-3 italic">
                <FaShieldAlt /> Termination Zone
            </h3>
            <p className="text-[10px] text-red-500 font-black uppercase tracking-widest leading-loose opacity-60">
                Warning: Account deletion is permanent and wipes all digital identity from CVify.
            </p>
        </div>

        <button
          onClick={onDeleteAccount}
          className="px-8 py-4 bg-red-600/10 hover:bg-red-600 hover:text-white text-red-500 font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl border border-red-500/20 transition-all shadow-lg active:scale-95"
        >
          Terminate Identity
        </button>
      </section>
    </div>
  );
};

export default SecuritySettings;
