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

// Logo do Feed (3 Avatares ClickSocial)
export function IconeLogoFeed({ tamanho = 22, cor = "#211C52" }) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 22 22" fill="none">
      <G opacity={0.6}>
        <Path
          d="M7.16573 13.628L6.56418 18.752C6.53113 19.0334 6.55471 19.3191 6.63337 19.5901C6.71202 19.8611 6.84395 20.1112 7.0204 20.3238C7.19684 20.5364 7.41377 20.7066 7.65679 20.8232C7.8998 20.9398 8.16334 21.0001 8.42992 21H13.5694C13.836 21.0002 14.0997 20.94 14.3428 20.8235C14.5859 20.707 14.803 20.5368 14.9795 20.3242C15.1561 20.1116 15.2881 19.8614 15.3668 19.5903C15.4455 19.3193 15.4691 19.0335 15.4361 18.752L14.8336 13.628C14.7484 12.9026 14.4171 12.2352 13.902 11.7513C13.387 11.2674 12.7235 11.0002 12.0364 11H9.9648C9.27733 10.9997 8.61344 11.2667 8.09797 11.7506C7.5825 12.2346 7.25098 12.9022 7.16573 13.628Z"
          stroke={cor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path d="M11 7C9.44265 7 8.1802 5.65685 8.1802 4C8.1802 2.34315 9.44265 1 11 1C12.5573 1 13.8197 2.34315 13.8197 4C13.8197 5.65685 12.5573 7 11 7Z" stroke={cor} strokeWidth="2" />
        <Path d="M18.5196 10C17.4814 10 16.6397 9.10457 16.6397 8C16.6397 6.89543 17.4814 6 18.5196 6C19.5578 6 20.3994 6.89543 20.3994 8C20.3994 9.10457 19.5578 10 18.5196 10Z" stroke={cor} strokeWidth="2" />
        <Path d="M3.48052 10C2.44232 10 1.60069 9.10457 1.60069 8C1.60069 6.89543 2.44232 6 3.48052 6C4.51872 6 5.36035 6.89543 5.36035 8C5.36035 9.10457 4.51872 10 3.48052 10Z" stroke={cor} strokeWidth="2" />
        <Path d="M18.5193 13H18.8069C19.2519 12.9999 19.6825 13.1678 20.0221 13.4738C20.3617 13.7798 20.5882 14.204 20.6614 14.671L20.9744 16.671C21.0193 16.9575 21.005 17.2511 20.9325 17.5311C20.86 17.8112 20.731 18.0711 20.5545 18.2928C20.378 18.5144 20.1582 18.6925 19.9105 18.8146C19.6628 18.9368 19.393 19 19.1199 19H15.6996M3.48067 13H3.19306C2.74806 12.9999 2.31748 13.1678 1.97791 13.4738C1.63834 13.7798 1.4118 14.204 1.3386 14.671L1.02561 16.671C0.980693 16.9575 0.994988 17.2511 1.0675 17.5311C1.14001 17.8112 1.269 18.0711 1.4455 18.2928C1.62199 18.5144 1.84175 18.6925 2.08949 18.8146C2.33724 18.9368 2.60702 19 2.88006 19H6.30042" stroke={cor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </G>
    </Svg>
  );
}

// Botão Buscar no Header
export function IconeBuscarFeed({ tamanho = 20, cor = "#2E1065" }) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 20 20" fill="none">
      <Path
        d="M18.7344 15.6139L15.567 12.4466L13.1308 11.44C13.942 10.2865 14.3766 8.91024 14.375 7.5C14.375 3.7091 11.2909 0.625 7.5 0.625C3.7091 0.625 0.625 3.7091 0.625 7.5C0.625 11.2909 3.7091 14.375 7.5 14.375C8.92251 14.3766 10.3101 13.9345 11.4695 13.1103L12.4734 15.54L15.6406 18.7075C15.8437 18.9106 16.0849 19.0717 16.3503 19.1817C16.6157 19.2916 16.9002 19.3482 17.1874 19.3482C17.4747 19.3482 17.7592 19.2917 18.0246 19.1817C18.29 19.0718 18.5311 18.9107 18.7343 18.7076C18.9374 18.5044 19.0986 18.2633 19.2085 17.9979C19.3184 17.7325 19.375 17.448 19.375 17.1608C19.375 16.8735 19.3185 16.589 19.2085 16.3236C19.0986 16.0582 18.9375 15.817 18.7344 15.6139ZM1.875 7.5C1.875 4.39844 4.39844 1.875 7.5 1.875C10.6016 1.875 13.125 4.39844 13.125 7.5C13.125 10.6016 10.6016 13.125 7.5 13.125C4.39844 13.125 1.875 10.6016 1.875 7.5Z"
        fill={cor}
      />
    </Svg>
  );
}

// 3 Pontos de Mais Informações
export function IconeMaisInformacoes({ tamanho = 18, cor = "#9CA3AF" }) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 18 18" fill="none">
      <Path d="M9 9.75C9.414 9.75 9.75 9.414 9.75 9C9.75 8.586 9.414 8.25 9 8.25C8.586 8.25 8.25 8.586 8.25 9C8.25 9.414 8.586 9.75 9 9.75Z" stroke={cor} strokeWidth="2" strokeLinecap="round" />
      <Path d="M14.25 9.75C14.664 9.75 15 9.414 15 9C15 8.586 14.664 8.25 14.25 8.25C13.836 8.25 13.5 8.586 13.5 9C13.5 9.414 13.836 9.75 14.25 9.75Z" stroke={cor} strokeWidth="2" strokeLinecap="round" />
      <Path d="M3.75 9.75C4.164 9.75 4.5 9.414 4.5 9C4.5 8.586 4.164 8.25 3.75 8.25C3.336 8.25 3 8.586 3 9C3 9.414 3.336 9.75 3.75 9.75Z" stroke={cor} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

// Coração de Curtida do Feed
export function IconeCoracaoFeed({ tamanho = 20, cor = "#9CA3AF", preenchido = false }) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 20 20" fill="none">
      <Path
        d="M2.47286 5.31981C1.94737 6.08392 1.66603 6.98944 1.66602 7.91678C1.66602 9.83347 2.91611 11.2501 4.16621 12.5002L8.75656 16.9435C8.9141 17.1199 9.10736 17.2607 9.32351 17.3566C9.53966 17.4526 9.77375 17.5014 10.0102 17.4999C10.2467 17.4984 10.4802 17.4466 10.6951 17.348C10.91 17.2493 11.1015 17.106 11.2568 16.9277L15.8338 12.5002C17.0839 11.2501 18.334 9.82514 18.334 7.91678C18.3384 6.98741 18.0596 6.07873 17.5348 5.31168C17.01 4.54463 16.264 3.9556 15.3961 3.62298C14.5282 3.29036 13.5796 3.22994 12.6766 3.44974C11.7735 3.66955 10.9588 4.15917 10.3408 4.85342C10.2972 4.9001 10.2444 4.93731 10.1858 4.96276C10.1271 4.9882 10.0639 5.00133 9.99999 5.00133C9.93607 5.00133 9.87284 4.9882 9.8142 4.96276C9.75557 4.93731 9.70279 4.9001 9.65913 4.85342C9.03927 4.16365 8.22474 3.67811 7.32313 3.46095C6.42151 3.24378 5.47522 3.30519 4.60925 3.63708C3.74327 3.96896 2.99835 4.55571 2.47286 5.31981Z"
        fill={preenchido ? cor : "none"}
        stroke={cor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

// Balão de Comentário do Feed
export function IconeMensagemFeed({ tamanho = 20, cor = "#9CA3AF" }) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 20 20" fill="none">
      <Path
        d="M2.57083 14.5909C2.64231 14.2661 2.61503 13.9274 2.49249 13.6183C1.63973 11.849 1.43929 9.8353 1.92652 7.93258C2.41376 6.02986 3.55736 4.36037 5.15557 3.21865C6.75377 2.07694 8.70386 1.53638 10.6618 1.69234C12.6197 1.84831 14.4596 2.69077 15.8569 4.0711C17.2542 5.45143 18.1191 7.28091 18.299 9.23677C18.4789 11.1926 17.9621 13.1492 16.84 14.7612C15.7179 16.3732 14.0625 17.5371 12.1659 18.0475C10.2692 18.558 8.25327 18.3822 6.47364 17.5511C6.18155 17.4402 5.86419 17.4136 5.55773 17.4744L2.71334 18.3061C2.57613 18.3425 2.43189 18.3433 2.29431 18.3083C2.15672 18.2734 2.03035 18.2038 1.92717 18.1063C1.82399 18.0088 1.74743 17.8866 1.70474 17.7512C1.66206 17.6158 1.65466 17.4718 1.68326 17.3327L2.57083 14.5909Z"
        stroke={cor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

// Compartilhar / Repost do Feed
export function IconeFrameFeed({ tamanho = 20, cor = "#9CA3AF" }) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 20 20" fill="none">
      <Path
        d="M7.1582 11.2583L12.8499 14.5752M12.8415 5.42445L7.1582 8.74139M17.5 4.16622C17.5 5.54704 16.3807 6.66642 15 6.66642C13.6193 6.66642 12.5 5.54704 12.5 4.16622C12.5 2.78539 13.6193 1.66602 15 1.66602C16.3807 1.66602 17.5 2.78539 17.5 4.16622ZM7.5 10C7.5 11.3808 6.38071 12.5002 5 12.5002C3.61929 12.5002 2.5 11.3808 2.5 10C2.5 8.61919 3.61929 7.49982 5 7.49982C6.38071 7.49982 7.5 8.61919 7.5 10ZM17.5 15.8338C17.5 17.2146 16.3807 18.334 15 18.334C13.6193 18.334 12.5 17.2146 12.5 15.8338C12.5 14.453 13.6193 13.3336 15 13.3336C16.3807 13.3336 17.5 14.453 17.5 15.8338Z"
        stroke={cor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

// Fogo / Destaques da Pesquisa
export function IconeFogoDestaque({ largura = 16, altura = 21 }) {
  return (
    <Svg width={largura} height={altura} viewBox="0 0 16 21" fill="none">
      <Path
        d="M13.1136 8.50665C12.8954 8.85892 12.6341 9.20437 12.3318 9.54301C12.1851 9.70777 12.007 9.84166 11.808 9.93688C11.609 10.0321 11.393 10.0867 11.1727 10.0976C10.9522 10.1103 10.7313 10.0791 10.523 10.0057C10.3147 9.93236 10.123 9.81834 9.95905 9.67028C9.76992 9.50038 9.62176 9.28982 9.52571 9.05442C9.42966 8.81902 9.38822 8.56491 9.40451 8.31119C9.47269 7.23392 9.12269 5.96801 8.3636 4.54529C7.97951 3.83165 7.52042 3.22256 6.97269 2.71802C6.91661 3.0786 6.82448 3.43265 6.6977 3.77483C6.38655 4.60777 5.93959 5.38341 5.37497 6.07029C4.98295 6.55111 4.53597 6.98436 4.04315 7.3612C3.27043 7.95438 2.63406 8.72483 2.20679 9.58619C1.7696 10.4612 1.54311 11.4263 1.54543 12.4044C1.54543 14.1066 2.21588 15.7066 3.43179 16.9135C4.65224 18.1225 6.2727 18.7862 7.99997 18.7862C9.72724 18.7862 11.3477 18.1225 12.5681 16.9135C13.7841 15.7089 14.4545 14.1066 14.4545 12.4044C14.4545 11.5135 14.2704 10.6476 13.9091 9.83392C13.6977 9.35665 13.4318 8.91347 13.1136 8.50665Z"
        fill="#FFC107"
      />
    </Svg>
  );
}
