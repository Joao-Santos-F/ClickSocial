import React from "react";
import Svg, { Path, Circle, Rect, G } from "react-native-svg";
import { theme } from "../styles/theme";

// Ícone Seta Voltar (em curva para esquerda)
export function IconeSetaVoltar({ tamanho = 22, cor = theme.colors.textPrimary }) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 14L4 9M4 9L9 4M4 9H15C18.3137 9 21 11.6863 21 15V19"
        stroke={cor}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// Badge de Verificação
export function IconeVerificado({ tamanho = 18, cor = "#5B5AE0" }) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2L14.7 4.2L18.1 4L19.4 7.2L22.6 8.7L22.2 12.1L24 15L22.2 17.9L22.6 21.3L19.4 22.8L18.1 26L14.7 25.8L12 28L9.3 25.8L5.9 26L4.6 22.8L1.4 21.3L1.8 17.9L0 15L1.8 12.1L1.4 8.7L4.6 7.2L5.9 4L9.3 4.2L12 2Z"
        transform="scale(0.8) translate(3, 0)"
        fill={cor}
      />
      <Path
        d="M7.5 12L10.5 15L16.5 9"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// Ícone do Destaque (Criatura / Mascote verde)
export function IconeDestaque({ tamanho = 32 }) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 40 40" fill="none">
      {/* Olho Esquerdo */}
      <Circle cx="12" cy="15" r="4" fill="#00FF66" />
      <Circle cx="12" cy="15" r="2" fill="#000000" />
      {/* Olho Direito */}
      <Circle cx="28" cy="18" r="4" fill="#00FF66" />
      <Circle cx="28" cy="18" r="2" fill="#000000" />
      {/* Boca */}
      <Path
        d="M10 24C12 29 28 29 30 24C28 21 12 21 10 24Z"
        fill="#00FF66"
      />
    </Svg>
  );
}

// Arte do Avatar / Post (Mascote Verde no fundo escuro)
export function MascoteVerde({ tamanho = 100 }) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 100 100" fill="none">
      <Rect width="100" height="100" fill="#0D0914" />
      {/* Olho Esquerdo grande e inclinado */}
      <Circle cx="32" cy="38" r="11" fill="#00FF66" />
      <Circle cx="32" cy="38" r="5.5" fill="#0D0914" />
      {/* Olho Direito */}
      <Circle cx="72" cy="46" r="10" fill="#00FF66" />
      <Circle cx="72" cy="46" r="5" fill="#0D0914" />
      {/* Boca larga com textura */}
      <Path
        d="M24 64C28 78 72 78 76 64C70 56 30 56 24 64Z"
        fill="#00FF66"
      />
      <Path
        d="M26 67C35 73 65 73 74 67"
        stroke="#0D0914"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}

// Tab 1: Galeria / Imagem
export function IconeTabImagem({ tamanho = 22, cor = theme.colors.textPrimary }) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none">
      <Rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="3"
        stroke={cor}
        strokeWidth="2"
      />
      <Circle cx="8.5" cy="8.5" r="1.5" fill={cor} />
      <Path
        d="M21 15L16 10L6 20"
        stroke={cor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// Tab 2: Conversas / Mensagens
export function IconeTabChat({ tamanho = 22, cor = theme.colors.textSecondary }) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00064 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
        stroke={cor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// Tab 3: Curtidas / Coração
export function IconeTabCoracao({ tamanho = 22, cor = theme.colors.textSecondary }) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        stroke={cor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// Tab 4: Repost
export function IconeTabRepost({ tamanho = 22, cor = theme.colors.textSecondary }) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17 1L21 5L17 9"
        stroke={cor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 11V9C3 6.79086 4.79086 5 7 5H21"
        stroke={cor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7 23L3 19L7 15"
        stroke={cor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 13V15C21 17.2091 19.2091 19 17 19H3"
        stroke={cor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// Bottom Nav: Início
export function IconeNavInicio({ tamanho = 24, cor = theme.colors.textSecondary }) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 10.182V20C3 20.5523 3.44772 21 4 21H9V14H15V21H20C20.5523 21 21 20.5523 21 20V10.182C21 9.68962 20.817 9.21447 20.4853 8.84754L12.4853 0.983909C12.2186 0.692297 11.7814 0.692297 11.5147 0.983909L3.51472 8.84754C3.18302 9.21447 3 9.68962 3 10.182Z"
        fill={cor}
      />
    </Svg>
  );
}

// Bottom Nav: Criar
export function IconeNavCriar({ tamanho = 24, cor = theme.colors.textSecondary }) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="9" stroke={cor} strokeWidth="2" />
      <Path
        d="M12 8V16M8 12H16"
        stroke={cor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

// Bottom Nav: Notificação
export function IconeNavNotificacao({ tamanho = 24, cor = theme.colors.textSecondary }) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21S18 15 18 8Z"
        stroke={cor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.73 21A2 2 0 0 1 10.27 21"
        stroke={cor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// Bottom Nav: Perfil
export function IconeNavPerfil({ tamanho = 24, cor = theme.colors.textPrimary }) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="4" stroke={cor} strokeWidth="2" />
      <Path
        d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21"
        stroke={cor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}
