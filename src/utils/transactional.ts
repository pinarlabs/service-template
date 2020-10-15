import Transactionable from "../services/Transactionable";

export default function transactional(
    target: any,
    propertyKey: string,
    propertyDesciptor: PropertyDescriptor): PropertyDescriptor {

    if (!(target instanceof Transactionable)) {
        const message = `[ERROR] ${target.constructor.name} must extend Transactionable in order to be able to use @transactional`;
        console.error(message);
        throw new Error(message);
    }

    const fn = propertyDesciptor.value;

    async function wrappedFn(context, ...args) {
        const method = fn.bind(this);
        if (context.transaction) {
            return method(context, ...args);
        }

        return this.db.transaction(async (transaction) => method({ ...context, transaction }, ...args));
    }

    propertyDesciptor.value = wrappedFn;
    
    return propertyDesciptor;
}
