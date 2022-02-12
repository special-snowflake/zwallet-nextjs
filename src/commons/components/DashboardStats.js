import Image from 'next/image';
import {useEffect, useState} from 'react';

import LoadingComponent from './LoadingComponent';

import styles from 'src/commons/styles/Home.module.css';

import income from 'public/static/icons/income.svg';
import expense from 'public/static/icons/expense.svg';
import {connect} from 'react-redux';

import {getDataDashboard} from 'src/modules/api/dashboard';
import {numberToRupiah} from 'src/modules/helpers/collection';

import {Bar} from 'react-chartjs-2';

function DashboardStats(props) {
  const [data, setData] = useState(null);
  const [dataDashboard, setDataDashboard] = useState(null);
  useEffect(() => {
    const id = props.id;
    const token = props.token;
    if (dataDashboard === null) {
      getDataDashboard(id, token)
        .then((res) => {
          console.log('data dashboard', res);
          setDataDashboard(res.data.data);

          let labels = [];
          let dataSetIncome = [];
          let dataSetExpense = [];

          const listIncome = res.data.data.listIncome;
          const listExpense = res.data.data.listExpense;

          listIncome.forEach((element) => {
            const day = element.day;
            labels.push(day.slice(0, 3));
            dataSetIncome.push(element.total);
          });
          listExpense.forEach((element) => {
            dataSetExpense.push(element.total);
          });

          console.log('label: ', labels, dataSetIncome, dataSetExpense);

          setData({
            labels,
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    display: false,
                  },
                },
              },
            },
            datasets: [
              {
                label: 'Income',
                data: dataSetIncome,
                backgroundColor: 'rgba(29,193,92,1)',
                // borderRadius: '10',
                // borderColor: 'rgba(255,99,132,1)',
                // borderWidth: 1,
                // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                // hoverBorderColor: 'rgba(255,99,132,1)',
              },
              {
                label: 'Expense',
                data: dataSetExpense,
                backgroundColor: 'rgba(255,91,54,1)',
                // borderRadius: '10',
                // borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                // hoverBorderColor: 'rgba(255,99,132,1)',
                //   data: rand(32, 100, 7),
              },
            ],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dataDashboard, props]);
  return (
    <>
      <div className={`col ${styles['dashboard-content-left']}`}>
        {dataDashboard !== 0 && data !== null ? (
          <>
            <div className='d-flex'>
              <div className='col text-start'>
                <div className={`${styles['wrapper-icons']} ms-1`}>
                  <Image
                    src={income}
                    alt='dahsboard'
                    objectFit='cover'
                    layout='fill'
                  />
                </div>
                <span className={`${styles['dashboard-income']}`}>Income</span>
                <div className='balance-income fw-bold'>
                  Rp{numberToRupiah(dataDashboard.totalIncome)}
                </div>
              </div>
              <div className='col text-end'>
                <div className={`${styles['wrapper-icons']} ms-auto me-1`}>
                  <Image
                    src={expense}
                    alt='dahsboard'
                    objectFit='cover'
                    layout='fill'
                  />
                </div>
                <span className={`${styles['dashboard-expense']}`}>
                  Expense
                </span>
                <div className='balance-outcome fw-bold'>
                  Rp{numberToRupiah(dataDashboard.totalExpense)}
                </div>
              </div>
            </div>
            {/* stats here */}
            <div className='position-relative w-100 mt-3'>
              <Bar
                data={data}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        display: false,
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                  responsive: true,
                  legend: {
                    label: {
                      fontSize: 14,
                      fontFamily: 'Nunito Sans',
                    },
                  },
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div className='d-flex'>
              <div className='col text-start'>
                <div className={`${styles['wrapper-icons']} ms-1`}>
                  <Image
                    src={income}
                    alt='dahsboard'
                    objectFit='cover'
                    layout='fill'
                  />
                </div>
                <span className={`${styles['dashboard-income']}`}>Income</span>
                <div className='balance-income fw-bold'>--</div>
              </div>
              <div className='col text-end'>
                <div className={`${styles['wrapper-icons']} ms-auto me-1`}>
                  <Image
                    src={expense}
                    alt='dahsboard'
                    objectFit='cover'
                    layout='fill'
                  />
                </div>
                <span className={`${styles['dashboard-expense']}`}>
                  Expense
                </span>
                <div className='balance-outcome fw-bold'>--</div>
              </div>
            </div>
            <LoadingComponent />
          </>
        )}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.userData.token,
    id: state.auth.userData.id,
    userData: state.users.data,
  };
};

export default connect(mapStateToProps)(DashboardStats);
