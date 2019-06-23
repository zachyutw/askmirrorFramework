const React =require( 'react');

function Column ({ children }){
    return <td>{children}</td>;
}

function Row ({ children }){
    return (
        <tr>
            {React.Children.map(children, (el) => {
                if (el.type === Column) return el;

                return <td>{el}</td>;
            })}
        </tr>
    );
}

function Grid ({ children }){
    return (
        <table align='left'>
            <tbody>
                {React.Children.map(children, (el) => {
                    if (!el) return;

                    if (el.type === Row) return el;

                    if (el.type === Column) {
                        return <tr>{el}</tr>;
                    }

                    return (
                        <tr>
                            <td>{el}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

Grid.Row = Row;
Grid.Column = Column;

module.exports =  Grid;
