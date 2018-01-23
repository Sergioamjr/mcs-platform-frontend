import React from 'react'
import BoxContent from './../BoxContent'
import FlexContent from './../FlexContent'
import { FormatValues } from './../../utils'

const ResumeAmount = ({ investimento, congelado, rendimento, total }) => (
  <FlexContent>
    <BoxContent grid='w-50 w-25-ns pa3'>
      <div className='f3 items-center bg-green c-white fw4 tc  pa4 ph3'>
        <span>
          <p className='c-white mb1 f5'>Investimento</p>
          <p className='c-white f4'>{FormatValues(investimento) || FormatValues(0)}</p>
        </span>
      </div>
    </BoxContent>
    <BoxContent grid='w-50 w-25-ns pa3'>
      <div className='f3 items-center bg-green c-white fw4 tc  pa4 ph3'>
        <span>
          <p className='c-white mb1 f5'>Congelado</p>
          <p className='c-white f4'>{FormatValues(congelado) || FormatValues(0)}</p>
        </span>
      </div>
    </BoxContent>
    <BoxContent grid='w-50 w-25-ns pa3'>
      <div className='f3 items-center bg-green c-white fw4 tc  pa4 ph3'>
        <span>
          <p className='c-white mb1 f5'>Total de rendimentos</p>
          <p className='c-white f4'>{FormatValues(rendimento) || FormatValues(0)}</p>
        </span>
      </div>
    </BoxContent>
    <BoxContent grid='w-50 w-25-ns pa3'>
      <div className='f3 items-center bg-green c-white fw4 tc  pa4 ph3'>
        <span>
          <p className='c-white mb1 f5'>Saldo Atual</p>
          <p className='c-white f4'>{FormatValues(total) || FormatValues(0)}</p>
        </span>
      </div>
    </BoxContent>

  </FlexContent>
)

export default ResumeAmount
