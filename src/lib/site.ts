export const SITE = {
  phone: "976244498",
  phoneDisplay: "976 244 498",
  email: "gerencia@rjdgroupsac.com",
  whatsappBase: "https://wa.me/51976244498",
  whatsappMessage:
    "Hola RJD Group, me gustaría solicitar información sobre sus servicios de ingeniería.",
};

export const whatsappUrl = (msg?: string) =>
  `${SITE.whatsappBase}?text=${encodeURIComponent(msg ?? SITE.whatsappMessage)}`;
