export const GetBeautifyDate = (date) => {
    try {
        let yourDate = new Date(date)
        return yourDate.toISOString().split('T')[0];
    } catch (error) {
        return false;
    }
}