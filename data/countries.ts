export interface Country {
  name: string;
  code: string;       // ISO 3166-1 alpha-2
  dialCode: string;
}

export const countries: Country[] = [
  // América
  { name: "Argentina", code: "ar", dialCode: "+54" },
  { name: "Bolivia", code: "bo", dialCode: "+591" },
  { name: "Brazil", code: "br", dialCode: "+55" },
  { name: "Canada", code: "ca", dialCode: "+1" },
  { name: "Chile", code: "cl", dialCode: "+56" },
  { name: "Colombia", code: "co", dialCode: "+57" },
  { name: "Costa Rica", code: "cr", dialCode: "+506" },
  { name: "Cuba", code: "cu", dialCode: "+53" },
  { name: "Dominican Republic", code: "do", dialCode: "+1-809" },
  { name: "Ecuador", code: "ec", dialCode: "+593" },
  { name: "El Salvador", code: "sv", dialCode: "+503" },
  { name: "Guatemala", code: "gt", dialCode: "+502" },
  { name: "Honduras", code: "hn", dialCode: "+504" },
  { name: "Mexico", code: "mx", dialCode: "+52" },
  { name: "Panama", code: "pa", dialCode: "+507" },
  { name: "Paraguay", code: "py", dialCode: "+595" },
  { name: "Peru", code: "pe", dialCode: "+51" },
  { name: "United States", code: "us", dialCode: "+1" },
  { name: "Uruguay", code: "uy", dialCode: "+598" },
  { name: "Venezuela", code: "ve", dialCode: "+58" },

  // Europa
  { name: "Austria", code: "at", dialCode: "+43" },
  { name: "Belgium", code: "be", dialCode: "+32" },
  { name: "Croatia", code: "hr", dialCode: "+385" },
  { name: "Denmark", code: "dk", dialCode: "+45" },
  { name: "Finland", code: "fi", dialCode: "+358" },
  { name: "France", code: "fr", dialCode: "+33" },
  { name: "Germany", code: "de", dialCode: "+49" },
  { name: "Greece", code: "gr", dialCode: "+30" },
  { name: "Italy", code: "it", dialCode: "+39" },
  { name: "Netherlands", code: "nl", dialCode: "+31" },
  { name: "Norway", code: "no", dialCode: "+47" },
  { name: "Portugal", code: "pt", dialCode: "+351" },
  { name: "Spain", code: "es", dialCode: "+34" },
  { name: "Sweden", code: "se", dialCode: "+46" },
  { name: "Switzerland", code: "ch", dialCode: "+41" },
  { name: "United Kingdom", code: "gb", dialCode: "+44" },

  // Asia
  { name: "China", code: "cn", dialCode: "+86" },
  { name: "India", code: "in", dialCode: "+91" },
  { name: "Indonesia", code: "id", dialCode: "+62" },
  { name: "Israel", code: "il", dialCode: "+972" },
  { name: "Japan", code: "jp", dialCode: "+81" },
  { name: "Malaysia", code: "my", dialCode: "+60" },
  { name: "Philippines", code: "ph", dialCode: "+63" },
  { name: "Saudi Arabia", code: "sa", dialCode: "+966" },
  { name: "Singapore", code: "sg", dialCode: "+65" },
  { name: "South Korea", code: "kr", dialCode: "+82" },
  { name: "Thailand", code: "th", dialCode: "+66" },
  { name: "Turkey", code: "tr", dialCode: "+90" },
  { name: "Vietnam", code: "vn", dialCode: "+84" },

  // África
  { name: "Egypt", code: "eg", dialCode: "+20" },
  { name: "Ghana", code: "gh", dialCode: "+233" },
  { name: "Kenya", code: "ke", dialCode: "+254" },
  { name: "Morocco", code: "ma", dialCode: "+212" },
  { name: "Nigeria", code: "ng", dialCode: "+234" },
  { name: "South Africa", code: "za", dialCode: "+27" },

  // Oceanía
  { name: "Australia", code: "au", dialCode: "+61" },
  { name: "New Zealand", code: "nz", dialCode: "+64" },
];
