{
    userList : [
        "Bob",
        "Steve",
        "Tony"
    ]
}

var dustGuideTests = [
    {
        name: "연습장",
        tests: [
            {
                name: "연습장",
                source: "",
                context: {}
            },
            {
                name: "demo01",
                source: "",
                context: {
                    "users": [
                        {
                            "name": "John",
                            "id": "john0124",
                            "telno": "010-1234-1234",
                            "friends" : ["aa", "bb", "cc"]
                        },
                        {
                            "name": "Steve",
                            "id": "magician",
                            "telno": "010-1234-1234",
                            "friends" : ["Harry", "Ronald", "Hermione"]
                        }
                    ]
                }
            },
            {
                name: "demo01 결과",
                source: "{#users}\n이름 : {name}{~n}\nid : {id}{~n}\n친구 목록 : {#friends}{.} {/friends}{~n}\n{~n}\n{/users}",
                context: {
                    "users": [
                        {
                            "name": "John",
                            "id": "john0124",
                            "telno": "010-1234-1234",
                            "friends" : ["aa", "bb", "cc"]
                        },
                        {
                            "name": "Steve",
                            "id": "magician",
                            "telno": "010-1234-1234",
                            "friends" : ["Harry", "Ronald", "Hermione"]
                        }
                    ]
                }
            },
            {
                name: "demo02",
                source: "",
                context: {
                    friends : ["Harry", "Ronald", "Hermione"],
                    onlineFriends : []
                }
            }, {
                name: "demo02 결과",
                source: "{?friends}\n  {#friends}{.} {/friends}{~n}\n{:else}\n  친구가 없습니다.\n{/friends}\n{?onlineFriends}\n  {#onlineFriends}{.} {/onlineFriends}\n{:else}\n  접속한 친구가 없습니다.\n{/onlineFriends}",
                context: {
                    friends : ["Harry", "Ronald", "Hermione"],
                    onlineFriends : []
                }
            },  {
                name: "demo03",
                source: "",
                context: {
                    "foo": "bar"
                }
            }, {
                name: "demo03 결과",
                source: "{@eq key=\"{foo}\" value=\"bar\"}\n            key와 value가 같음\n{/eq}",
                context: {
                    "foo": "bar"
                }
            }, {
                name: "demo04",
                source: "",
                context: {
                    "foo": "bar"
                }
            }, {
                name: "demo04 결과",
                source: (function () {
                    var str = "";
                    str += "{@select key=\"{foo}\"}\n";
                    str += "  {@eq value=\"bar\"}bar{/eq}\n";
                    str += "  {@eq value=\"baz\"}baz{/eq}\n";
                    str += "  {@default}default 출력{/default}\n";
                    str += "{/select}";
                    return str;
                })(),
                context: {
                    "foo": "bar"
                }
            },
            {
                name: "demo05",
                source: "",
                context: {
                    "foo": "bar"
                }
            },
            {
                name: "demo05 결과",
                source: (function () {
                    var str = "";
                    str += "{@if cond=\" '{foo}' === 'bar' \"}\n";
                    str += "  조건이 true로 평가되었습니다.\n";
                    str += "{/if}\n";
                    return str;
                })(),
                context: {
                    "foo": "bar"
                }
            }
        ]

    },
    {
        name: "Dust Core - 참조태그 {name}",
        tests: [
            {
                name: "참조 기본",
                source: '{hello}',
                context: {"hello": "Hello, World!"}
            },
            {
                name: "참조를 사용하여 표현할 수 있는 형식",
                source: '문자열 : {str} (","로 사용하여 표현), 숫자 : {num}, 불린 : {boolean}',
                context: {
                    str: "Hello, World!",
                    num: 123456789,
                    boolean: true
                }
            },
            {
                name: "참조를 사용하여 옳바르게 표현할 수 없는 형식",
                source: '배열 : {arr}, 객체 : {obj}',
                context: {arr: ["3", "aa", 3, 4, 5],
                    obj: {a: "1", b: "2"}
                }
            },
            {
                name: "특정 배열데이터 가져오기",
                source: '1번 배열 데이터는 {arr[1]}',
                context: {"arr": [
                    "1", "hello,", "world!"
                ]}
            },
            {
                name: "계층을 가질 경우 모델 참조",
                source: '{a.b.c.hello}',
                context: {
                    a: {
                        b: {
                            c: {
                                hello: "Hello, World!"
                            }
                        },
                        hello: "not referencable"

                    }
                }
            }
        ]
    },
    {
        name: "Dust Core - 섹션태그 {#name}",
        tests: [
            {
                name: "배열에서 사용법",
                source: '{#contact}이름 : {name}{~n}{/contact}',
                context: {
                    "contact": [
                        {"name": "홍진호"},
                        {"name": "임요환"},
                        {"name": "김택용"}
                    ]
                }
            },
            {
                name: "객체에서 사용법",
                source: "{#contact}\n이름 : {name}{~n}\n전화번호 : {tel}{~n}\n이메일 : {email}\n{/contact}",
                context: {
                    "contact": {
                        "name": "박세종",
                        "tel": "010-000-0000",
                        "email": "sjpark@itwise.co.kr"
                    }
                }
            },
            {
                name: "자기자신 표현법",
                source: '{#name}이름 : {.}{~n}{/name}',
                context: {"name": ["홍진호", "임요환", "김택용"]}
            },
            {
                name: "컨텍스트 사용법",
                source: '{!section 태그 두개 사용하기!}\n{#users}\n  {#john}\n    {!users.john이 현재 컨텍스트로 설정!}\n    john id : {id}, telno : {telno}\n  {/john}{~n}\n\n  {!users를 현재컨텍스트로 사용!}\n  larry의 id는 {larry.id}\n{/users}\n',
                context: {
                    "users": {
                        "john": {
                            "id": "john0124",
                            "password": "asdf12",
                            "telno": "010-1234-1234"
                        },
                        "larry": {
                            "id": "cutecatholic",
                            "password": "asdf12",
                            "telno": "010-1234-1234"
                        }
                    }
                }
            },
            {
                name: "배열에서 {$len}, {$idx} 사용법",
                source: '{#names}{$len}중 {$idx}번째 이름 : {.}{~n}{/names}',
                context: {
                    names: ["John", "Larry", "Bob", "Steve"]
                }
            },
            {
                name: "외부 파라미터 사용법(scala)",
                source: '{#names greet="hello!!"}{greet} {.}{~n}{/names}',
                context: { names: ["John", "Larry", "Bob", "Steve"]}
            },
            {
                name: "외부 파라미터 사용법(컨텍스트)",
                source: '{#names i18nStr=i18n.kor}{i18nStr.greeting} {.}{~n}{/names}',
                context: {
                    "names": ["John", "Larry", "Bob", "Steve"],
                    "i18n": {
                        kor: {"greeting": "안녕하세요!"},
                        eng: {"greeting": "hello!"}
                    }
                }
            }
        ]
    },
    {
        name: "Dust Core - 주석태그 {!name!}",
        tests: [
            {
                name: "주석 기본",
                source: '{!주석은 이렇게 씁니다.!}',
                context: {}
            },
            {
                name: "주석 내부 dust 태그",
                source: '{!주석 내부 dust 태그는 compile 되지 않습니다. {hello}.!}',
                context: {"hello": "Hello, World!"}
            },
            {
                name: "주석 내부 개행 사용",
                source: '{!주석 내부 \n 개행이 \n허용됩니다.!}',
                context: {}
            }
        ]
    },
    {
        name: "Dust Core - 이스케이프 필터 {name|s|js}",
        tests: [
            {
                name: "자동 이스케이프 필터 {name|s}",
                source: "{safe|s}{~n}{unsafe}",
                context: {
                    "safe": "<script>alert('Hello!')</script>",
                    "unsafe": "<script>alert('Goodbye!')</script>"
                }
            },
            {
                name: "이스케이프 필터",
                source: "html escape : {test|h}{~n}\njavascript escape : {test|u}{~n}\nencode URI : {test|u}",
                context: {
                    "test": "<div>test('Hello!')</script>"
                }
            },
            {
                name: "JSON 형식으로 출력",
                source: "{user|js}{~n}{~n}이스케이프 취소문자열과 함께 사용함{~n}{user|js|s}",
                context: {
                    "user": {
                        "name": "Sejong",
                        "contact": {"email": "sejong@test.com"}
                    },
                    "a": [1, 2, 3, 4, 5]
                }
            },
            {
                name: "이스케이프 필터 동시 사용",
                source: "{user|js|s}{~n}{~n}{user|js|u}",
                context: {
                    "user": {
                        "name": "Sejong",
                        "contact": {"email": "sejong@test.com"}
                    },
                    "a": [1, 2, 3, 4, 5]
                }
            }
        ]
    },
    {
        name: "Dust Core - 이스케이프 문자열",
        tests: [
            {
                name: "이스케이프 문자열 {~n}",
                source: "{!\n{~n} : 개행\n{~r} :  캐리지리턴(CR)\n{~lb} : \"{\" 왼쪽 중괄호\n{~rb} : \"}\" 오른쪽 중괄호\n{~s}  : 공백\n!}\n\n개행{~n}입니다.{~n}\n{~lb} : 왼쪽 중괄호{~n}\n{~rb} : 오른쪽 중괄호{~n}\n{~s}{~s}{~s}{~s}  : 공백\n",
                context: {
                    "safe": "<script>alert('Hello!')</script>",
                    "unsafe": "<script>alert('Goodbye!')</script>"
                }
            }
        ]
    },
    {
        name: "Dust Core - 조건문 {?name}{^name}",
        tests: [
            {
                name: "true일 경우 분기처리. {?name}",
                source: "{?test}true 입니다.{/test}",
                context: {
                    "test": true
                }
            },
            {
                name: "false일 경우 분기처리. {^name}",
                source: "{^test}false 입니다.{/test}",
                context: {
                    "test": false
                }
            },
            {
                name: "dust상에서 true false를 검사하는 조건",
                source: (function () {
                    var str = "dust상에서 true false를 구분하는 조건{~n}{~n}\n" +
                        "- true일 경우\n" +
                        "{~n}\n" +
                        "{?booleanTrue}true일경우 출력됩니다.{/booleanTrue}{~n}\n" +
                        "{?zero}0일경우 출력됩니다.{/zero}{~n}\n" +
                        "{?num}숫자가 존재할 경우 출력됩니다.{/num}{~n}\n" +
                        "{?existStr}문자열이 존재할 경우 출력됩니다.{/existStr}{~n}\n" +
                        "{?existObject}빈 객체가 아닐 경우 출력됩니다.{/existObject}{~n}\n" +
                        "{?emptyObj}빈 객체일 출력됩니다.{/emptyObj}{~n}\n" +
                        "{?existArray}빈 배열이 아닐 경우 출력됩니다.{/existArray}{~n}\n" +
                        "{~n}\n" +
                        "- false일 경우{~n}\n" +
                        "{^booleanFalse}false일경우 출력됩니다.{/booleanFalse}{~n}\n" +
                        "{^undefinedObj}undefined일 경우{/undefinedObj}{~n}\n" +
                        "{^nullObj}null일 경우 출력됩니다.{/nullObj}{~n}\n" +
                        "{^emptyStr}빈 문자열일 경우 출력됩니다.{/emptyStr}{~n}\n" +
                        "{^emptyArr}빈 배열일 경우 출력됩니다.{/emptyArr}{~n}";
                    return str;
                })(),
                context: {
                    "booleanTrue": true,
                    "zero": 0,
                    "num": 123.1,
                    "existStr": "test",
                    "existObject": {a: "asdf"},
                    "emptyObj": {},
                    "existArray": [],
                    "booleanFalse": false,
                    "undefinedObj": undefined,
                    "nullObj": null,
                    "emptyStr": "",
                    "emptyArr": []
                }
            },
            {
                name: "else문 사용법 {:else}",
                source: "로그인 여부 : {?isLogin}로그인 상태{:else}로그아웃 상태{/isLogin}",
                context: {
                    "isLogin": false
                }
            },
            {
                name: "else문 사용법 {:else} (섹션 태그에서 사용)",
                source: "{#friends}{.}{:else}친구가없습니다.{/friends}",
                context: {
                    "friends": []
                }
            }
        ]
    },
    {
        name: "Dust Helper - Select {@select}",
        tests: [
            {
                name: "Select helper 기본",
                source: (function () {
                    var str = "";
                    str += "select문에는 key를 하위 조건 helper에서 value와 비교한다.\n";
                    str += "{@select key=\"{foo}\"}\n";
                    str += "  {@eq value=\"bar\"}bar{/eq}\n";
                    str += "{/select}";
                    return str;
                })(),
                context: {
                    "foo": "bar"
                }
            }
            ,
            {
                name: "Select helper default helper 사용",
                source: (function () {
                    var str = "";
                    str += "{@select key=\"{foo}\"}\n";
                    str += "  {@eq value=\"bar\"}bar{/eq}\n";
                    str += "  {@eq value=\"bar\"}bar{/eq}\n";
                    str += "  {@default}default는 모든 상위 조건문이 통과되었을 경우 출력{/default}\n";
                    str += "{/select}";
                    return str;
                })(),
                context: {
                    "foo": "default"
                }
            },
            {
                name: "Select helper 다양한 조건 helper 사용",
                source: (function () {
                    var str = "";
                    str += "{@select key=\"{foo}\"}\n";
                    str += "  {@eq value=\"bar\"}key와 동일할 경우 선택{/eq}\n";
                    str += "  {@ne value=\"bar\"}key와 동일하지 않을 경우 선택{/ne}\n";
                    str += "  {@lt value=\"bar\"}key속성이 value보다 작을경우{/lt}\n";
                    str += "  {@default}상위 조건문들이 선택되지 않았을 경우 선택{/default}\n";
                    str += "{/select}";
                    return str;
                })(),
                context: {
                    "foo": "default"
                }
            }
        ]
    },
    {
        name: "Dust Helper - 조건 helper {@eq}, {@ne}, {@lt}.....",
        tests: [
            {
                name: "key == value  {@eq}",
                source: (function () {
                    var str = "";
                    str += "{@eq key=\"{foo}\" value=\"bar\"}key와 value가 같을 경우{/eq}\n";
                    return str;
                })(),
                context: {
                    "foo": "bar"
                }
            },
            {
                name: "key != value  {@ne}",
                source: (function () {
                    var str = "";
                    str += "{@ne key=\"{foo}\" value=\"var\"}key와 value가 같지 않을 경우{/ne}\n";
                    str += "";
                    return str;
                })(),
                context: {
                    "foo": "bar"
                }
            },
            {
                name: "key > value  {@gt}",
                source: (function () {
                    var str = "";
                    str += "{@gt key=\"{foo}\" value=5}key가 value 보다 클 경우{/gt}\n";
                    str += "";
                    return str;
                })(),
                context: {
                    "foo": 12
                }
            },
            {
                name: "key >= value  {@gte}",
                source: (function () {
                    var str = "";
                    str += "{@gte key=\"{foo}\" value=5}key가 value 보다 크거나 같을 경우{/gte}\n";
                    str += "";
                    return str;
                })(),
                context: {
                    "foo": 12
                }
            },
            {
                name: "key < value  {@lt}",
                source: (function () {
                    var str = "";
                    str += "{@lt key=\"{foo}\" value=20}key가 value 보다 작을 경우{/lt}\n";
                    str += "";
                    return str;
                })(),
                context: {
                    "foo": 12
                }
            },
            {
                name: "key <= value  {@lte}",
                source: (function () {
                    var str = "";
                    str += "{@lte key=\"{foo}\" value=20}key가 value 보다 작을 경우{/lte}\n";
                    str += "";
                    return str;
                })(),
                context: {
                    "foo": 12
                }
            },
            {
                name: "조건 helper와 else 같이 사용하기",
                source: (function () {
                    var str = "";
                    str += "{@eq key=\"{foo}\" value=\"bar\"}\n  key == value\n{:else}\n  key와 value는 같지 않음\n{/eq}\n";
                    return str;
                })(),
                context: {
                    "foo": "notSame"
                }
            }
        ]
    }
    ,
    {
        name: "Dust Helper - math helper {@math}",
        tests: [
            {
                name: "math helper 기본",
                source: (function () {
                    var str = "";
                    str += '16 + 4 : {@math key="16" method="add" operand="4"/}{~n}\n';
                    str += '16 - 4 :  {@math key="16" method="subtract" operand="4"/}{~n}\n';
                    str += '16.5 버림 : {@math key="16.5" method="floor"/}{~n}\n';
                    str += '16.5 올림 : {@math key="16.5" method="ceil"/}{~n}\n';
                    str += '16.5 반올림 : {@math key="16.5" method="round"/}{~n}\n';
                    str += '-8의 절대값 : {@math key="-8" method="abs"/}{~n}\n';
                    str += '3 / 2의 나머지 : {@math key="3" method="mod" operand="2"/}{~n}\n';
                    return str;
                })(),
                context: {}
            },
            {
                name: "{@math} helper를 조건 helper와 함께 사용하기.",
                source: (function () {
                    var str = "";
                    str += '{@math key="16" method="add" operand="4"}\n';
                    str += '  {@eq value=12}결과는 12입니다.{/eq}\n';
                    str += '  {@eq value=20}결과는 20입니다.{/eq}\n';
                    str += '  {@default}결과를 찾을 수 없습니다.{/default}\n';
                    str += '{/math}\n';
                    return str;
                })(),
                context: {}
            }
        ]
    },
    {
        name: "Dust Helper - if helper{@if cond=\"condition\"}",
        tests: [
            {
                name: "if 조건문 사용하기",
                source: (function () {
                    var str = "";
                    str += "{@if cond=\" 'a' == 'a' \"}\n";
                    str += "  조건이 true로 평가되었습니다.\n";
                    str += "{/if}\n";
                    str += "{@if cond=\" 'a' == 'b' \"}\n";
                    str += "  정상처리되지 않음.\n";
                    str += "{/if}";
                    return str;
                })(),
                context: {}
            },
            {
                name: "if 조건문 else와 함께 사용하기",
                source: (function () {
                    var str = "";
                    str += "{@if cond=\" 'a' == 'b' \"}\n";
                    str += "  조건이 true로 평가되었습니다.\n";
                    str += "{:else}\n";
                    str += "  조건이 false로 평가되었습니다.\n";
                    str += "{/if}";
                    return str;
                })(),
                context: {}
            },
            {
                name: "if 조건문에서 모델을 참조하기",
                source: (function () {
                    var str = "";
                    str += "{@if cond=\" '{foo}' === 'bar' \"}\n";
                    str += "  조건이 true로 평가되었습니다.\n";
                    str += "{/if}\n";
                    return str;
                })(),
                context: {
                    "foo": "bar"
                }
            },
            {
                name: "if 조건 helper에 동시에 여러 비교문 실행하기",
                source: (function () {
                    var str = "";
                    str += "{@if cond=\"{foo}==='bar'\"}\n";
                    str += "  조건이 true로 평가되었습니다.\n";
                    str += "{/if}\n";
                    return str;
                })(),
                context: {
                    "foo": "bar"
                }
            },
            {
                name: "if를 최대한 사용하지 말아야 하는 이유",
                source: (function () {
                    var str = "";
                    str += "{@if cond=\"{foo}==='bar'\"}foo === bar??{~n}{/if}\n";
                    str += "{@if cond=\"{baz}===''\"}baz === \"\"{/if}\n";
                    str += "추가필요. 성능에 대한 이야기는 어떻게??";

                    return str;
                })(),
                context: {
                    "foo": "bar",
                    "baz": "qux"
                }
            }
        ]
    },
    {
        name: "Dust Helper - 기타 주요 헬퍼",
        tests: [
            {
                name: "separator helper {@sep}",
                source: "{#friends}{.}{@sep}, {/sep}{/friends}",
                context: {
                    "friends": ["홍진호", "임요환", "강민", "박성준"]
                }
            },
            {
                name: "size helper {@size}",
                source: "Size of friends is.... {@size key=friends/}",
                context: {
                    "friends": ["홍진호", "임요환", "강민", "박성준"]
                }
            },
            {
                name: "context dump helper {@contextDump}",
                source: "{@contextDump/}",
                context: {
                    "a": "a",
                    "b": "b",
                    "c": {
                        "a": "b",
                        "b": [1, 2],
                        "c": {
                            "d": "e",
                            "f": "g"
                        }
                    },
                    "d": [6, 7]
                }
            }
        ]

    }
];

if (typeof module !== "undefined" && typeof require !== "undefined") {
    module.exports = dustGuideTests; // We're on node.js
} else {
    window.dustGuideTests = dustGuideTests; // We're on the browser
}
