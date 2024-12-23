interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export async function fetchAddressByCEP(cep: string): Promise<ViaCEPResponse> {
  const cleanCEP = cep.replace(/\D/g, "");
  const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);

  if (!response.ok) {
    throw new Error("CEP não encontrado");
  }

  const data = await response.json();

  if (data.erro) {
    throw new Error("CEP não encontrado");
  }

  return data;
}
