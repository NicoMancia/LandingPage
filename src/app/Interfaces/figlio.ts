
//interfacce del figlio da utilizzare
export interface InterfaceLead {
    id: number,
    nome: string,
    cognome: string,
    email: string,
    regione?: string
}

export interface InterfaceItemForm{
    placeholder: string,
    name: string,
    label: string,
}

export interface InterfaceData{
    nome: string,
    cognome: string,
    email: string
}

export interface InterfaceSelect{
    value: string;
}
