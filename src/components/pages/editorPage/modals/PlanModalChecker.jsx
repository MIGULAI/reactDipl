import React, { useEffect } from "react";
import MyTable from "../../../UI/MyTable/MyTable";
import classes from "./PlanModalChecker.module.css"
import PropTypes from 'prop-types';
import MyLabel from "../../../UI/MyLabel/MyLabel";
import MyButton from "../../../UI/MyButton/MyButton";
import { useState } from "react";


const PlanModalChecker = ({ newPlans, setPlans, saveFunc, cancelFunc }) => {
    const { item, row, author, title, buttonsGroup, disableButton, succeesButton} = classes
    const [active, setActive] = useState ({i: null, j: null})
    const [isReadOnly, setIsReadOnly] = useState(() => {
        let array = []
        for(let i = 0; i < newPlans.length ; i++){
            array.push([true, true, true, true])
        }
        return array
    } );

    const changePlan = (newVal, i, param) => {
        let newPlan = JSON.parse(JSON.stringify(newPlans))
        newPlan[i][param] = Number(newVal)
        setPlans(newPlan)
    }

    useEffect(()=>{
        if(active.j !== null && active.i !== null){
            let ready = []
            for(let i = 0; i < newPlans.length ; i++){
                ready.push([true, true, true, true])
            }
            ready[active.i][active.j] = false
            setIsReadOnly(ready)
        }

    }, [active])
    
    return (
        <div>
            <div className={title}>
                <MyLabel>Підтвердіть правильність згенерованого плану</MyLabel>

            </div>
            <MyTable headers={['ПІБ', 'тези', 'статті', 'скопуси', 'підручники']}>

                {
                    newPlans.map((plan, i) =>
                        <tr className={row} key={i}>
                            <td className={author}>
                                <span>{plan.AuthorSername}</span>
                            </td>
                            <td className={item}>
                                <input 
                                    index={i} 
                                    readOnly={isReadOnly[i][0]} 
                                    onChange={(e) => changePlan(e.target.value, e.target.getAttribute('index'),'Theses') } 
                                    type="number" 
                                    min={0}
                                    onDoubleClick={e => setActive({i: e.target.getAttribute('index'), j:0})}
                                    defaultValue={plan.Theses}/>
                            </td>
                            <td className={item}>
                                <input 
                                    index={i} 
                                    readOnly={isReadOnly[i][1]} 
                                    onChange={(e,i) => changePlan(e.target.value, e.target.getAttribute('index'),'ProfetionalArticles') }  
                                    type="number" 
                                    min={0}
                                    onDoubleClick={e => setActive({i: e.target.getAttribute('index'), j:1})}
                                    defaultValue={plan.ProfetionalArticles}/>
                            </td>
                            <td className={item}>
                                <input 
                                    index={i} 
                                    readOnly={isReadOnly[i][2]} 
                                    onChange={(e,i) => changePlan(e.target.value, e.target.getAttribute('index'),'Scopus') }  
                                    min={0}
                                    type="number" 
                                    onDoubleClick={e => setActive({i: e.target.getAttribute('index'), j:2})}
                                    defaultValue={plan.Scopus}/>
                            </td>
                            <td className={item}>
                                <input 
                                    index={i} 
                                    readOnly={isReadOnly[i][3]} 
                                    onChange={(e,i) => changePlan(e.target.value, e.target.getAttribute('index'),'Manuals') }  
                                    min={0}
                                    type="number" 
                                    onDoubleClick={e => setActive({i: e.target.getAttribute('index'), j:3})}

                                    defaultValue={plan.Manuals}/>
                            </td>
                        </tr>
                    )
                }
            </MyTable>
            <div className={buttonsGroup}>
                <MyButton onClick={cancelFunc} className={disableButton}><ion-icon name="close-circle-outline"></ion-icon></MyButton>
                <MyButton onClick={saveFunc} className={succeesButton}><ion-icon name="checkmark-circle-outline"></ion-icon></MyButton>
            </div>
        </div>
    )
}

PlanModalChecker.defaultProps = {
    newPlans: []
}

PlanModalChecker.propTypes = {
    newPlans: PropTypes.array,
    setPlans: PropTypes.func,
    saveFunc: PropTypes.func,
    cancelFunc: PropTypes.func
}

export default PlanModalChecker