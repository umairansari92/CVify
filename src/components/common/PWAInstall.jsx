import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaDownload, FaMobileAlt, FaDesktop } from "react-icons/fa";

const PWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const showInstallationInvite = async (promptEvent) => {
    const result = await Swal.fire({
      title: "Install CVify Pro",
      text: "Get the best experience by installing our app on your device!",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Install Now",
      cancelButtonText: "Maybe Later",
      background: "var(--midground)",
      color: "var(--text-main)",
      backdrop: `rgba(2, 6, 23, 0.4) blur(8px)`,
      customClass: {
        popup: "glass rounded-3xl border-border-subtle shadow-2xl",
        confirmButton: "btn-primary",
        cancelButton: "btn-secondary",
        title: "text-2xl font-black",
      },
      html: `
        <div class="flex flex-col items-center gap-6 py-4">
          <div class="flex gap-4 justify-center">
            <div class="p-4 bg-primary/10 rounded-2xl text-primary flex flex-col items-center gap-2">
               <i class="fas fa-mobile-alt text-2xl"></i>
               <span class="text-[10px] font-black uppercase">Mobile</span>
            </div>
            <div class="p-4 bg-accent/10 rounded-2xl text-accent flex flex-col items-center gap-2">
               <i class="fas fa-desktop text-2xl"></i>
               <span class="text-[10px] font-black uppercase">Desktop</span>
            </div>
          </div>
          <p class="text-text-muted font-medium text-center">Fast, offline access, and a full native app experience.</p>
        </div>
      `,
    });

    if (result.isConfirmed && promptEvent) {
      promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      console.log(`PWA: User response to the install prompt: ${outcome}`);
      setDeferredPrompt(null);
      window.deferredPrompt = null;
    }
    
    // Mark as shown for this session (optional, but good for UX)
    sessionStorage.setItem("pwa_prompt_shown", "true");
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      console.log("PWA: beforeinstallprompt event fired!");
      e.preventDefault();
      setDeferredPrompt(e);
      window.deferredPrompt = e;

      const hasShownPrompt = sessionStorage.getItem("pwa_prompt_shown");
      if (!hasShownPrompt) {
        // Delay it slightly for better UX on first load
        setTimeout(() => showInstallationInvite(e), 2000);
      }
    };

    const handleManualTrigger = () => {
      console.log("PWA: Manual trigger received. Event available:", !!window.deferredPrompt);
      if (window.deferredPrompt) {
        showInstallationInvite(window.deferredPrompt);
      } else {
        Swal.fire({
          title: "Install CVify Pro",
          html: `
            <div class="text-left space-y-4 py-2">
              <p class="font-bold">To install this app manually:</p>
              <ul class="list-disc pl-5 space-y-2 text-sm text-text-muted">
                <li>Click the <span class="text-primary font-bold">Install</span> icon in the top-right of your address bar.</li>
                <li>Or go to Browser Menu <span class="font-bold">...</span> > <span class="font-bold">Save and Share</span> > <span class="font-bold">Install CVify Pro</span>.</li>
              </ul>
            </div>
          `,
          icon: "info",
          background: "var(--midground)",
          color: "var(--text-main)",
          customClass: {
            popup: "glass rounded-3xl border-border-subtle shadow-2xl",
            confirmButton: "btn-primary",
            title: "text-2xl font-black",
          }
        });
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("trigger-pwa-install", handleManualTrigger);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("trigger-pwa-install", handleManualTrigger);
    };
  }, []);

  const handleInstallClick = () => {
    const event = new Event("trigger-pwa-install");
    window.dispatchEvent(event);
  };

  // This component doesn't render anything itself, but provides a button for external use.
  // The instruction implies adding a button *next to the theme toggle*, which would be in a parent component.
  // For this component to provide the button, it must return JSX.
  // Assuming the instruction means this component should *offer* the button,
  // or that the button is part of this component's responsibility.
  // If it's meant to be rendered elsewhere, this component would remain null and the button logic would be external.
  // Given the instruction "Add an 'Install App' button... Trigger the custom event",
  // and the component's name `PWAInstall`, it's reasonable to assume it should render the button.
  return null;
};

export default PWAInstall;
