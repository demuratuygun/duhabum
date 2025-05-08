

export function evaluateDecisionTree(tree, getEvent) {

    if ( tree === null || typeof tree !== 'object') throw new Error('Geçersiz ağaç yapısı');
    if ( tree.leave) return tree.leave;
    
    if( tree.query ) {

        let query = tree.query;
        let value = getEvent?.(query.id).val;
        if( !value ) throw new Error('Form değerleri eksik: ', query.id);

        if( query.ui == 'number' ) {
            for ( const branch of tree.branches ) 
                if( Number(value) <= Number(branch.if) ) 
                    return evaluateDecisionTree( branch, getEvent );
        }
        else if( query.ui == 'select' || query.ui == 'input' ) { 
            for ( const branch of tree.branches ) {
                let rule = branch.if[0]=='/' ? branch.if.split('/').slice(1, -1).join('') : branch.if;
                let flag = branch.if[0]=='/' ? branch.if.split('/')[-1] : '';
                let regex = new RegExp( rule, flag );
                if( query.ui == 'select' && Array.isArray(value) ) { value = value.join(); }
                if( regex.test( value ) ) 
                    return evaluateDecisionTree( branch, getEvent );
            }
        }
        
    }

    throw new Error('Ağaç yapısı geçersiz veya eşleşme bulunamadı');
}