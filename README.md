[![Node CI](https://github.com/AlexBalykin/frontend-project-lvl2/workflows/Node%20CI/badge.svg)](https://github.com/AlexBalykin/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/620ae605ea1d1fd2bd7f/maintainability)](https://codeclimate.com/github/AlexBalykin/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/620ae605ea1d1fd2bd7f/test_coverage)](https://codeclimate.com/github/AlexBalykin/frontend-project-lvl2/test_coverage)

## Описание
Вычислитель отличий – программа определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов http://www.jsondiff.com/. Подобный механизм, например, используется при выводе тестов или при автоматическом отслеживании изменении в конфигурационных файлах.

Возможности утилиты:

* Поддержка разных форматов входных форматов: yaml, ini, json
* Генерация отчета в виде plain text, stylish и json

Пример использования:

```
$ gendiff --format plain path/to/file.ini another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

$ gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}
```

## Install
```sh
$ sudo npm install gendiff-aleba
```

### Diff json files
[![asciicast](https://asciinema.org/a/N3i7yl3gb5HsA2e5NOc9mjkYB.svg)](https://asciinema.org/a/N3i7yl3gb5HsA2e5NOc9mjkYB)

### Diff yml files
[![asciicast](https://asciinema.org/a/d4xiVrJaTiTRJckH2fCeMZogq.svg)](https://asciinema.org/a/d4xiVrJaTiTRJckH2fCeMZogq)

### Diff ini files
[![asciicast](https://asciinema.org/a/Wm3urtuOfXRpGIjMfkEeZ7JMU.svg)](https://asciinema.org/a/Wm3urtuOfXRpGIjMfkEeZ7JMU)