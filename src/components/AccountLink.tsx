import type { ReactNode } from 'react';
import '../styles/account.css';

/** Decorative hover scene keeps the original link's hit area and destination. */
export function AccountLink({ children, variant }: { children: ReactNode; variant: 'nav' | 'hero' }) {
  return <a href="https://start.ng/?signin=1" className={`btn ${variant === 'nav' ? 'nav-signin' : 'ghost'} account-link account-link--${variant}`}>
    <span className="account-label">{children}</span>
    <span className="account-scene" aria-hidden="true">
      <svg viewBox="0 0 200 160" fill="none">
        <ellipse cx="100" cy="146" rx="72" ry="6" fill="#292a23" opacity=".09" />
        <path d="M39 91V131H72" stroke="#9aab80" strokeWidth="12" strokeLinecap="round" />
        <path d="M61 120L82 128L87 142M75 141H94" stroke="#292a23" strokeWidth="10" strokeLinecap="round" />
        <path d="M47 80Q61 71 81 80L87 116Q68 126 47 113Z" fill="#d8fd71" stroke="#292a23" strokeWidth="2.5" />
        <path d="M61 77L67 86L75 77M67 86V99" stroke="#8ea64b" strokeWidth="2" strokeLinecap="round" />
        <path d="M61 65V78Q68 84 74 77V63" fill="#8b5033" stroke="#292a23" strokeWidth="2" />
        <g className="typing-head">
          <ellipse cx="68" cy="48" rx="23" ry="26" fill="#a86845" stroke="#292a23" strokeWidth="2.5" />
          <ellipse cx="45" cy="51" rx="4" ry="6" fill="#a86845" />
          <path d="M46 38Q42 23 57 21Q63 13 74 21Q92 21 90 42L84 35Q73 41 66 32Q57 41 47 36Z" fill="#292a23" />
          <path d="M57 43l7-1m11 1l7 2" stroke="#292a23" strokeWidth="2" strokeLinecap="round" />
          <circle cx="61" cy="49" r="2.4" fill="#292a23" /><circle cx="79" cy="51" r="2.4" fill="#292a23" />
          <path d="M66 61Q73 66 80 60" stroke="#292a23" strokeWidth="2.2" strokeLinecap="round" />
        </g>
        <path d="M42 126H178M51 128L47 146M170 128L175 146" stroke="#292a23" strokeWidth="4" strokeLinecap="round" />
        <path d="M81 89L92 106L122 112" stroke="#8b5033" strokeWidth="10" strokeLinecap="round" />
        <g className="typing-hand typing-hand-right"><path d="M119 112L133 114" stroke="#a86845" strokeWidth="7" strokeLinecap="round" /><path d="M128 110l5 1m-7 3l8 2" stroke="#292a23" strokeWidth="1.5" strokeLinecap="round" /></g>
        <path d="M51 91L61 110L94 118" stroke="#a86845" strokeWidth="10" strokeLinecap="round" />
        <path d="M114 117H165L177 124H100Z" fill="#dce0d3" stroke="#292a23" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M120 119h35m-34 3h24" stroke="#7e8473" strokeWidth="1.5" strokeDasharray="3 3" />
        <g className="typing-hand typing-hand-left"><path d="M92 118L106 120" stroke="#a86845" strokeWidth="7" strokeLinecap="round" /><path d="M101 116l6 1m-8 3l9 2" stroke="#292a23" strokeWidth="1.5" strokeLinecap="round" /></g>
        <path d="M111 78Q111 74 115 74H171Q175 74 175 78L166 116H119Z" fill="#292a23" stroke="#292a23" strokeWidth="2" strokeLinejoin="round" />
        <path d="M117 80H169L162 110H123Z" fill="#46503b" />
        <g stroke="#d8fd71" strokeWidth="2.7" strokeLinecap="round">
          <path className="typing-code code-one" d="M126 87H151" />
          <path className="typing-code code-two" d="M125 94H158" />
          <path className="typing-code code-three" d="M129 102H146" />
          <path className="typing-cursor" d="M152 99V105" />
        </g>
        <g className="typing-spark" stroke="#8da53e" strokeWidth="2" strokeLinecap="round"><path d="M158 44V54M153 49H163M179 61V67M176 64H182" /></g>
      </svg>
      <span className="account-caption">{variant === 'nav' ? 'Click to sign in' : "Let's create an account"}</span>
    </span>
  </a>;
}
