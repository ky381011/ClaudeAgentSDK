import sys
import importlib

def main():
    if len(sys.argv) < 4:
        print("使用方法: python main.py <パッケージ> <モジュール> <関数名> <引数...>")
        print("")
        print("例:")
        print("  python main.py calcurator arithmetic add 10 5")
        print("  python main.py calcurator arithmetic subtract 20 3")
        print("  python main.py calcurator arithmetic multiply 4 6")
        print("  python main.py calcurator arithmetic divide 15 3")
        print("")
        print("演算子記号でも実行可能:")
        print("  python main.py calcurator arithmetic + 10 5")
        print("  python main.py calcurator arithmetic - 20 3")
        print("  python main.py calcurator arithmetic '*' 4 6")
        print("  python main.py calcurator arithmetic / 15 3")
        sys.exit(1)

    package_name = sys.argv[1]
    module_name = sys.argv[2]
    function_name = sys.argv[3]
    args = sys.argv[4:]

    operator_map = {
        '+': 'add',
        '-': 'subtract',
        '*': 'multiply',
        '/': 'divide'
    }

    if function_name in operator_map:
        function_name = operator_map[function_name]

    try:
        module = importlib.import_module(f"{package_name}.{module_name}")
    except ImportError as e:
        print(f"エラー: モジュール '{package_name}.{module_name}' が見つかりません")
        print(f"詳細: {e}")
        sys.exit(1)

    try:
        func = getattr(module, function_name)
    except AttributeError:
        print(f"エラー: 関数 '{function_name}' が '{package_name}.{module_name}' に見つかりません")
        sys.exit(1)

    try:
        numeric_args = [float(arg) for arg in args]
    except ValueError:
        print("エラー: 引数はすべて数値である必要があります")
        sys.exit(1)

    try:
        result = func(*numeric_args)
        print(f"結果: {result}")
    except TypeError as e:
        print(f"エラー: 引数の数が正しくありません")
        print(f"詳細: {e}")
        sys.exit(1)
    except ValueError as e:
        print(f"エラー: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
