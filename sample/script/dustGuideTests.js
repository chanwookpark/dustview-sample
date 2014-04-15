var dustGuideTests = [
    {
        name: "Dust Core",
        tests: []
    },
    {
        name: "Dust Core - 참조태그 {name}",
        tests: [
            {
                name: "참조 기본",
                source: '{hello}',
                context: {"hello": "Hello, World!"},
                expected: "Hello, World!"
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
            },
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
                    "zero" : 0,
                    "num" : 123.1,
                    "existStr" : "test",
                    "existObject" : {a : "asdf"},
                    "emptyObj" : {},
                    "existArray" : [],
                    "booleanFalse" : false,
                    "undefinedObj" : undefined,
                    "nullObj" : null,
                    "emptyStr" :"",
                    "emptyArr" : []
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
