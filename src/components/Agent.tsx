export function Agent({ phone = false }: { phone?: boolean }) {
  return <svg viewBox="0 0 100 140" fill="none" aria-hidden="true">
    <ellipse cx="51" cy="133" rx="34" ry="5" fill="#292a23" opacity=".12" />
    <path d="M39 94L33 121M33 121L23 127H38" stroke="#292a23" strokeWidth="12" strokeLinecap="round" />
    <g className="kick-leg"><path d="M54 94L64 120M64 121L78 125H63" stroke="#292a23" strokeWidth="12" strokeLinecap="round" /><path d="M66 125H79" stroke="#d8fd71" strokeWidth="3" strokeLinecap="round" /></g>
    <path d="M29 65Q47 54 64 65L68 98Q49 108 27 97Z" fill="#d8fd71" stroke="#292a23" strokeWidth="2.5" /><path d="M43 61L49 71L56 61M49 72V84" stroke="#819940" strokeWidth="2" />
    <path d="M29 70L19 89L29 93" stroke="#8b5033" strokeWidth="10" strokeLinecap="round" />
    <g className={phone ? 'phone-hand' : 'agent-arm'}><path d="M64 70L78 82L85 58" stroke="#8b5033" strokeWidth="10" strokeLinecap="round" />{phone && <g transform="rotate(10 86 50)"><rect x="78" y="36" width="17" height="29" rx="4" fill="#292a23" /><rect x="81" y="39" width="11" height="20" rx="2" fill="#d8fd71" /><path d="M84 45h4m-4 4h3" stroke="#292a23" strokeWidth="1.5" /></g>}</g>
    <path d="M43 48V62Q49 68 55 61V47" fill="#8b5033" stroke="#292a23" strokeWidth="2" /><ellipse cx="48" cy="34" rx="23" ry="26" fill="#a86845" stroke="#292a23" strokeWidth="2.5" /><ellipse cx="25" cy="37" rx="5" ry="7" fill="#a86845" /><ellipse cx="71" cy="37" rx="5" ry="7" fill="#a86845" />
    <path d="M28 26Q25 9 40 8Q46 0 56 7Q72 7 70 27L65 20Q55 25 48 17Q40 26 29 21Z" fill="#292a23" /><circle cx="40" cy="34" r="2.4" fill="#292a23" /><circle cx="57" cy="34" r="2.4" fill="#292a23" /><path d="M41 45Q49 53 58 43M36 27l7-1m11 0l7 1" stroke="#292a23" strokeWidth="2.5" strokeLinecap="round" /><path d="M65 18Q80 19 78 36L72 40M25 20Q17 24 20 38" stroke="#292a23" strokeWidth="4" />
    {phone && <><rect x="69" y="31" width="7" height="15" rx="3.5" fill="#d8fd71" stroke="#292a23" strokeWidth="2" /><path d="M73 43Q72 52 60 51" stroke="#292a23" strokeWidth="2" /><circle cx="59" cy="51" r="3" fill="#292a23" /></>}
  </svg>;
}
