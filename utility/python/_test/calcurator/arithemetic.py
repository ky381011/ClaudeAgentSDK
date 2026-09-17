import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from calcurator import arithmetic


class TestAdd:
    def test_add_positive_numbers(self):
        assert arithmetic.add(2, 3) == 5
        assert arithmetic.add(10, 20) == 30

    def test_add_negative_numbers(self):
        assert arithmetic.add(-2, -3) == -5
        assert arithmetic.add(-10, 20) == 10

    def test_add_zero(self):
        assert arithmetic.add(0, 5) == 5
        assert arithmetic.add(5, 0) == 5
        assert arithmetic.add(0, 0) == 0

    def test_add_floats(self):
        assert arithmetic.add(1.5, 2.5) == 4.0
        assert arithmetic.add(0.1, 0.2) == pytest.approx(0.3)


class TestSubtract:
    def test_subtract_positive_numbers(self):
        assert arithmetic.subtract(10, 3) == 7
        assert arithmetic.subtract(5, 2) == 3

    def test_subtract_negative_numbers(self):
        assert arithmetic.subtract(-5, -3) == -2
        assert arithmetic.subtract(10, -5) == 15

    def test_subtract_zero(self):
        assert arithmetic.subtract(5, 0) == 5
        assert arithmetic.subtract(0, 5) == -5
        assert arithmetic.subtract(0, 0) == 0

    def test_subtract_floats(self):
        assert arithmetic.subtract(5.5, 2.5) == 3.0
        assert arithmetic.subtract(0.3, 0.1) == pytest.approx(0.2)


class TestMultiply:
    def test_multiply_positive_numbers(self):
        assert arithmetic.multiply(3, 4) == 12
        assert arithmetic.multiply(5, 2) == 10

    def test_multiply_negative_numbers(self):
        assert arithmetic.multiply(-3, 4) == -12
        assert arithmetic.multiply(-3, -4) == 12

    def test_multiply_zero(self):
        assert arithmetic.multiply(5, 0) == 0
        assert arithmetic.multiply(0, 5) == 0
        assert arithmetic.multiply(0, 0) == 0

    def test_multiply_floats(self):
        assert arithmetic.multiply(2.5, 4) == 10.0
        assert arithmetic.multiply(1.5, 2.0) == 3.0


class TestDivide:
    def test_divide_positive_numbers(self):
        assert arithmetic.divide(10, 2) == 5
        assert arithmetic.divide(15, 3) == 5

    def test_divide_negative_numbers(self):
        assert arithmetic.divide(-10, 2) == -5
        assert arithmetic.divide(-10, -2) == 5

    def test_divide_floats(self):
        assert arithmetic.divide(5.0, 2.0) == 2.5
        assert arithmetic.divide(7.5, 2.5) == 3.0

    def test_divide_by_zero(self):
        with pytest.raises(ValueError, match="Cannot divide by zero"):
            arithmetic.divide(10, 0)

    def test_divide_zero_by_number(self):
        assert arithmetic.divide(0, 5) == 0
        assert arithmetic.divide(0, -5) == 0
