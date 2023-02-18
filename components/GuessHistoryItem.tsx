type GuessHistoryItemProps = {
  index: number;
  guessedWord: string;
  hits: number;
}

export default function GuessHistoryItem({index, guessedWord, hits}: GuessHistoryItemProps) {
  return (
    <tr className="h-12">
      <td>{index}</td>
      <td>{guessedWord}</td>
      <td>{hits}</td>
    </tr>
  );
}
