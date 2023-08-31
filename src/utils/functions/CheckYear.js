export const CheckYear = () => {
    const now = new Date();
    const d = new Date();
    d.setMonth(7)
    d.setDate(31)
    if (now < d) {
        return now.getFullYear() -1
    }
    return now.getFullYear()
}