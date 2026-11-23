function Flavor({oneFlavor}) {
    return (
        <div className={styles.flavor}>
            <h3>{oneFlavor.name}</h3>
            <span>Quantity: {oneFlavor.scoopsSelected}</span>
            <div>
                <button className={styles.btnMin}>-</button>
                <button className={styles.btnAdd}>+</button>
            </div>
        </div>
    );
}


export default Flavor;