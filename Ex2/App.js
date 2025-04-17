import {Button, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useState,useEffect} from 'react';

const App = () => {

    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const [playerX,setPlayerX] = useState('')
    const [playerO,setPlayerO] = useState('')

const [strikeClass,setStrikeClass] = useState('')
    const calculateWinner = (squares) => {
        console.log('Checking winner for squares:', squares);
        const lines = [
            {combo: [0, 1, 2], strikeClass: 'strikeRow1'},
            {combo: [3, 4, 5], strikeClass: 'strikeRow2'},
            {combo: [6, 7, 8], strikeClass: 'strikeRow3'},

            {combo: [0, 3, 6], strikeClass: 'strikeCol1'},
            {combo: [1, 4, 7], strikeClass: 'strikeCol2'},
            {combo: [2, 5, 8], strikeClass: 'strikeCol3'},

            {combo: [0, 4, 8], strikeClass: 'strikeDiagonal1'},
            {combo: [2, 4, 6], strikeClass: 'strikeDiagonal2'},

        ]
        for (const {combo, strikeClass} of lines) {
            const [a, b, c] = combo;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                // setStrikeClass(strikeClass);
                // return squares[a];
                return { winner: squares[a], strikeClass };
            }
        }
        return null;

    }
    useEffect(() => {
        console.log('winner', winner)
        console.log('strikeClass', strikeClass)
        console.log('board', board)
        console.log('isXNext', isXNext)
    }, [winner, strikeClass, board, isXNext]);


    // const [winner, setWinner] = useState(null);

    useEffect(() => {
        const result = calculateWinner(board);
        if (result) {
            setWinner(result.winner);
            setStrikeClass(result.strikeClass);
            if (result.winner === 'O'){
                setPlayerO(player=> player + 1)
            }
            else {
                setPlayerX(player=> player + 1)
            }
        }
    }, [board]);


    // const winner = calculateWinner(board);


    const handleClick = (index) => {
        if (board[index] || winner) {
            return;
        }

        // const newBoard = board.slice();
        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);

        setIsXNext(!isXNext);
    }

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setStrikeClass('');
        setWinner('');

    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Хрестики-Нулики</Text>
            {/*<View style={styles.boardWrapper}>*/}
            {winner && <View style={styles[strikeClass]}/>}

            <View style={styles.board }>

                {
                    board.map((value, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.cell }
                            onPress={() => handleClick(index)}
                        >
                            <Text style={styles.cellText}>{value}</Text>
                        </TouchableOpacity>
                    ))
                }
            {/*</View>*/}
            </View>

            {winner ? (
                <View style={styles.winnerContainer}>
                    <Text style={styles.winnerText}>{winner} виграв!</Text>
                    <Button title="Нова гра" onPress={resetGame}/>
                    {playerX || playerO ? <Text>Player_X:{playerX.length} | Player_O:{playerO.length}</Text> : null}
                </View>
            ) : (
                <Text style={styles.turnText}>
                    Черга гравця: {isXNext ? 'Хрестики (X)' : 'Нулики (0)'}
                </Text>

            )}
            <StatusBar/>


        </View>
    );
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    board: {

        flexDirection: 'row',
        flexWrap: 'wrap', // Створюємо багаторядкову сітку
        width: 300,
        height: 300,
        marginBottom: 20,
    },
    cell: {

        width: '33.33%', // Кожна клітина займає 1/3 ширини
        height: '33.33%', // Кожна клітина займає 1/3 висоти
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#fff',
    },
    cellText: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    winnerContainer: {
        alignItems: 'center',
    },
    winnerText: {
        fontSize: 20,
        marginBottom: 10,
    },
    turnText: {
        fontSize: 18,
        marginTop: 20,
    },
    // boardWrapper: {
    //     position: 'relative', // Обязательное условие
    //     width: 300,
    //     height: 300,
    //     marginBottom: 20,
    // },
    strikeRow1:{
        position: 'absolute',
        transform:[{rotate:'90deg'}],
        width: 6,
        height: '35%',
        backgroundColor: '#ef9739',
        left: 198, // позиция первой колонки
        top: 160,
        zIndex: 10,
    },
    strikeRow2:{
        position: 'absolute',
        transform:[{rotate:'90deg'}],
        width: 6,
        height: '35%',
        backgroundColor: '#ef9739',
        left: 198, // позиция первой колонки
        top: 260,
        zIndex: 10,
    },
    strikeRow3:{
        position: 'absolute',
        transform:[{rotate:'90deg'}],
        width: 6,
        height: '35%',
        backgroundColor: '#ef9739',
        left: 198, // позиция первой колонки
        top: 360,
        zIndex: 10,
    },
    strikeCol1:{
        position: 'absolute',
        width: 6,
        height: '35%',
        backgroundColor: '#ef9739',
        left: 98, // позиция первой колонки
        top: 262,
        zIndex: 10,

    },
    strikeCol2:{
        position: 'absolute',
        width: 6,
        height: '35%',
        backgroundColor: '#ef9739',
        left: 198, // позиция первой колонки
        top: 262,
        zIndex: 10,
    },
    strikeCol3:{
        position: 'absolute',
        width: 6,
        height: '35%',
        backgroundColor: '#ef9739',
        left: 298, // позиция первой колонки
        top: 262,
        zIndex: 10,
    },
    strikeDiagonal1:{
         position: 'absolute',
        transform:[{rotate:'135deg'}],
        width: 6,
        height: '40%',
        backgroundColor: '#ef9739',
        left: 198, // позиция первой колонки
        top: 240,
        zIndex: 10,
    },
    strikeDiagonal2:{
        position: 'absolute',
        transform:[{rotate:'45deg'}],
        width: 6,
        height: '40%',
        backgroundColor: '#ef9739',
        left: 198, // позиция первой колонки
        top: 240,
        zIndex: 10,

    }

});
