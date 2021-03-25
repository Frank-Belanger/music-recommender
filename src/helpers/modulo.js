export default function mod(num, modulo) {
    return (((num % modulo) + modulo) % modulo);
};