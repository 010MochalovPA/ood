enum CommandKey {
    InsertParagraph = 'insertParagraph',
    InsertImage = 'insertImage',
    Help = 'help',
    SetTitle = 'setTitle',
    List = 'list',
    Undo = 'undo',
    Redo = 'redo',
}

const CommandDescriptions = {
    [CommandKey.InsertParagraph]:
        'Пример команды: insertParagraph <позиция>|end <текст параграфа>\n' +
        'Вставляет в указанную позицию документа параграф с указанным текстом.',
    [CommandKey.InsertImage]:
        'Пример команды: insertImage <позиция>|end <ширина> <высота> <путь к файлу изображения>\n' +
        'Вставляет в указанную позицию документа изображение, находящееся по указанному пути.',
    [CommandKey.Help]:
        'Пример команды: help\n' +
        'Выводит справку с доступных командах редактирования и их аргументах.',
    [CommandKey.SetTitle]:
        'Пример команды: SetTitle <заголовок документа>\n' +
        'Изменяет заголовок документа.',
    [CommandKey.List]:
        'Пример команды: List\n' +
        'Выводит название и список элементов документа в стандартный поток вывода.',
    [CommandKey.Undo]:
        'Пример команды: Undo\n' +
        'Отменяет действие ранее введенной команды редактирования, возвращая документ в предыдущее состояние.',
    [CommandKey.Redo]:
        'Пример команды: Redo\n' +
        'Выполняет ранее отмененную команду редактирования, возвращая документ в состояние, отменяет действие команды Undo.',
};

export {
    CommandKey,
    CommandDescriptions,
};