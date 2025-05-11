ALTER TABLE calculations
RENAME COLUMN credit_sum TO principal;

ALTER TABLE calculations
RENAME COLUMN yearly_rate TO annual_percentage_rate;

ALTER TABLE calculations
RENAME COLUMN capital TO down_payment;
