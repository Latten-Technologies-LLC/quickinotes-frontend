import React from 'react'

import AuthLayout from './layouts/AuthLayout'

export default function Notebooks() {
  return (
    <AuthLayout pageMeta={{title: "Settings", footer: false, header: true}}>
      <div>Notebooks</div>
    </AuthLayout>
  )
}
