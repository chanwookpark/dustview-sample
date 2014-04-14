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
                    str : "Hello, World!",
                    num : 123456789,
                    boolean : true
                }
            },
            {
                name: "참조를 사용하여 옳바르게 표현할 수 없는 형식",
                source: '배열 : {arr}, 객체 : {obj}',
                context: {arr : ["3","aa",3,4,5],
                    obj : {a : "1", b : "2"}
                }
            },
            {
                name: "특정 배열데이터 가져오기",
                source: '1번 배열 데이터는 {arr[1]}',
                context: {"arr": [
                    "1","hello,","world!"
                ]}
            },
            {
                name: "계층을 가질 경우 모델 참조",
                source: '{a.b.c.hello}',
                context: {
                    a:{
                        b:{
                            c:{
                                hello : "Hello, World!"
                            }
                        },
                        hello : "not referencable"

                    }
                }
            },
        ]
    },
    {
        name: "Dust Core - 섹션태그 {#name}",
        tests: [
            {
                name: "배열에서 사용법",
                source: '{#contact}이름 : {name}{~n}{/contact}',
                context: {
                    "contact" : [
                        {"name":"홍진호"},
                        {"name":"임요환"},
                        {"name":"김택용"}
                    ]
                }
            },
            {
                name: "객체에서 사용법",
                source: "{#contact}\n이름 : {name}{~n}\n전화번호 : {tel}{~n}\n이메일 : {email}\n{/contact}",
                context: {
                    "contact" : {
                        "name" : "박세종",
                        "tel" : "010-000-0000",
                        "email" : "sjpark@itwise.co.kr"
                    }
                }
            },
            {
                name: "자기자신 표현법",
                source: '{#name}이름 : {.}{~n}{/name}',
                context: {"name" : ["홍진호", "임요환", "김택용"]}
            },
            {
                name: "컨텍스트 사용법",
                source: '{!section 태그 두개 사용하기!}\n{#users}\n  {#john}\n    {!users.john이 현재 컨텍스트로 설정!}\n    john id : {id}, telno : {telno}\n  {/john}{~n}\n\n  {!users를 현재컨텍스트로 사용!}\n  larry의 id는 {larry.id}\n{/users}\n',
                context: {
                    "users": {
                        "john" : {
                            "id" : "john0124",
                            "password" : "asdf12",
                            "telno" : "010-1234-1234"
                        },
                        "larry" : {
                            "id" : "cutecatholic",
                            "password" : "asdf12",
                            "telno" : "010-1234-1234"
                        }
                    }
                }
            },
            {
                name: "배열에서 {$len}, {$idx} 사용법",
                source: '{#names}{$len}중 {$idx}번째 이름 : {.}{~n}{/names}',
                context: {
                    names : ["John", "Larry", "Bob", "Steve"]
                }
            },
            {
                name: "외부 파라미터 사용법(scala)",
                source: '{#names greet="hello!!"}{greet} {.}{~n}{/names}',
                context: { names : ["John", "Larry", "Bob", "Steve"]}
            },
            {
                name: "외부 파라미터 사용법(컨텍스트)",
                source: '{#names i18nStr=i18n.kor}{i18nStr.greeting} {.}{~n}{/names}',
                context: {
                    "names": ["John", "Larry", "Bob", "Steve"],
                    "i18n" : {
                        kor : {"greeting" : "안녕하세요!"},
                        eng : {"greeting" : "hello!"}
                    }
                }
            }
        ]
    },

];

if (typeof module !== "undefined" && typeof require !== "undefined") {
    module.exports = dustGuideTests; // We're on node.js
} else {
    window.dustGuideTests = dustGuideTests; // We're on the browser
}
