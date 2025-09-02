import CashRoiModel from "app/lib/models/cashRoiModel";

export const calculationAccessor = (id: string) => {
    const storedData = localStorage.getItem(`calculations`);
    const parsed = storedData ? JSON.parse(storedData) : [];
    const calculation: CashRoiModel = parsed.find((item: { id: string }) => item.id === id);
    return calculation;
}

export const calculationsAccessor = () => {
    const storedData = localStorage.getItem(`calculations`);
    const calculations = storedData ? JSON.parse(storedData) : [];
    return calculations;
}
