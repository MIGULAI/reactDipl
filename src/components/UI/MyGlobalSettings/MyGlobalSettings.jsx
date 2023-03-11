import React from "react";

const MyGlobalSettings = () => {
    return (
        <div className={statBar}>
            <div className={item}>
                <div className={item}>
                    <MyLabel>Кількість авторів у однієї публікації :</MyLabel>
                    <MyInput value={authorsPublCount} onChange={(e) => setAuthorsPublCount(Number(e.target.value))} />
                    <MyButton onClick={handleAuthorsNumber}>{`Зберегти`}</MyButton>
                </div>
                <div className={item}>
                    <MyLabel>Автопідтвердження :</MyLabel>
                    <MyInput type={'checkbox'} defaultChecked={autoSubmit} onChange={(e) => setAutoSubmit(!e.target.value)} />
                    <MyButton onClick={e => console.log(`Зберегти`)}>{`Зберегти`}</MyButton>
                </div>
            </div>
        </div>
    )
}

export default MyGlobalSettings